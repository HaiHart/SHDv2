package main

import (
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	pb "github.com/HaiHart/ShipdockServer/proto"
	mx "github.com/gorilla/mux"
	"github.com/wailsapp/wails"
	rt "github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type Ship struct {
	Name    string
	Placed  int
	Iden    string
	Key     int32
	Detail  detail
	InTime  time.Time
	OutTime time.Time
	Length  uint32
}

type Doc struct {
	No           int
	Name         string
	Length       uint32
	BoarderRight int
	// occ          uint32
	ShipList []string
}

type ShipStruct struct {
	log          *wails.CustomLogger
	runtime      *wails.Runtime
	Counter      int `json:"version"`
	Docks        []Doc
	Ships        []Ship
	Log          []string
	signal       chan string
	IP           string
	client       pb.ComClient
	ctx          context.Context
	cancle       context.CancelFunc
	streamConn   pb.Com_MoveShipClient
	storeCommand chan pb.PlaceShip
}

func (s *ShipStruct) imgLoader(w http.ResponseWriter, r *http.Request) {
	var Path = "./" + "image_ship.jpg"
	img, err := ioutil.ReadFile(Path)
	if err != nil {
		Log <- fmt.Sprintf("%v", err)
		fmt.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "img/jpeg")
	w.Write(img)
}

func (s *ShipStruct) imgUpload(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 30)
	file, handler, err := r.FormFile("Img")
	if err != nil {
		Log <- fmt.Sprintf("%v", err)
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)
	tmpFile, err := os.Create("./image_ship.jpg")
	if err != nil {
		return
	}
	defer tmpFile.Close()
	if _, err := io.Copy(tmpFile, file); err != nil {
		Log <- fmt.Sprintf("%v", err)
		fmt.Println(err)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Yes")
}

func (s *ShipStruct) checkConn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Header().Add("Accept-Charset", "utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Yes")
}

func (s *ShipStruct) runServer(wg *sync.WaitGroup) {
	defer wg.Done()
	wg.Add(1)
	r := mx.NewRouter()
	r.HandleFunc("/img", imgLoader)
	r.HandleFunc("/Conn", checkConn)
	r.HandleFunc("/save", imgUpload)
	http.Handle("/", r)
	err := http.ListenAndServe(":4040", nil)
	if err != nil {
		fmt.Println(err)
	}
}

func (s *ShipStruct) startup(ctx context.Context) {
	s.ctx = ctx
	go func() {
		for {
			select {
			case event := <-s.signal:
				fmt.Println(s.Docks[0].ShipList)
				s.Log = append(s.Log, event)
				rt.EventsEmit(s.ctx, "Ship", s)
			}
		}
	}()
	go func() {
		var wg sync.WaitGroup
		// go RunServer(&wg)

		go func() {
			var group errgroup.Group
			s.connectServer()
			group.Go(s.fetchFromServer)
			group.Go(s.createServerChannel)
			err := group.Wait()
			if err != nil {
				fmt.Println(err)
				return
			}
		}()

		wg.Wait()
	}()
	// s.signal <- "start"
}

func (s *ShipStruct) connectServer() {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	conn, err := grpc.Dial(fmt.Sprintf("localhost:%v", 8050), opts...)
	// conn, err := grpc.Dial(s.IP, opts...)
	if err != nil {
		fmt.Println(err)
	}
	s.client = pb.NewComClient(conn)
	// defer conn.Close()
}

func (s *ShipStruct) fetchFromServer() error {
	in, err := s.client.FetchDocks(s.ctx, &pb.Header{Time: timestamppb.Now()})
	if err != nil {
		return err
	}
	s.Docks = make([]Doc, 0)
	s.Ships = make([]Ship, 0)
	for _, v := range in.Docks {
		s.Docks = append(s.Docks, Doc{
			Name:         v.Name,
			No:           int(v.No),
			Length:       v.Length,
			BoarderRight: int(v.BoarderRight),
			ShipList:     append([]string{}, v.ShipList...),
		})
	}
	for _, v := range in.Ships {
		s.Ships = append(s.Ships, Ship{
			Name:    v.Name,
			Placed:  int(v.Placed),
			Key:     v.Key,
			Iden:    v.Iden,
			Length:  v.Length,
			InTime:  v.InTime.AsTime(),
			OutTime: v.OutTime.AsTime(),
			Detail: detail{
				From:   v.Detail.From,
				Owner:  v.Detail.Owner,
				AtTime: v.Detail.AtTime,
				By:     v.Detail.By,
			},
		})
	}
	for _, v := range in.Log {
		s.Log = append(in.Log, v)
	}
	rt.EventsEmit(s.ctx, "Ship", s)
	return nil
}

func (s *ShipStruct) createServerChannel() error {
	stream, err := s.client.MoveShip(s.ctx)
	if err != nil {
		fmt.Println(err)
	}
	go func() {
		s.streamConn = stream
		for {
			in, err := stream.Recv()
			if err == io.EOF {
				stream, err = s.client.MoveShip(s.ctx)
				var wait = 1
				for err != nil {
					time.Sleep(time.Duration(wait) * time.Second)
					stream, err = s.client.MoveShip(s.ctx)
					if wait < 100 {
						wait = wait * 2
					}
				}

				s.streamConn = stream
				continue
			}
			if err != nil {
				fmt.Println(err)
			}

			// fmt.Println(in.List[0].Id, int(in.List[0].NewPlace))
			// b.Change(in.List[0].Id, int(in.List[0].NewPlace))
			if in.Err == "desync" {
				s.fetchFromServer()
				continue
			}
			if in.ChangeTime {
				s.setTime(in.Ship.Name, in.Ship.InTime.AsTime(), in.Ship.OutTime.AsTime())
				continue
			}
			var name = in.Ship.Name
			var doc = in.Place
			s.placeShip(int(doc), name)
		}
	}()
	go func() {
		for {
			select {
			case commmand := <-s.storeCommand:
				err := stream.Send(&commmand)
				if err != nil {
					fmt.Println("send command to somewhere: ", err)
				}
				fmt.Println("Yesssssssssssss")
			}
		}
	}()

	// <-waitc
	return nil
}

func (s *ShipStruct) getShip(Name string) int {
	for k, i := range s.Ships {
		if i.Name == Name {
			return k
		}
	}
	return -1
}

func (s *ShipStruct) getDock(DocPlace int) int {
	for k, i := range s.Docks {
		if i.No == (DocPlace) {
			return k
		}
	}
	return -1
}

func (s *ShipStruct) checkFit(doc int, ship int) []int {
	idx := doc
	count := make([]int, 0)
	count = append(count,s.Docks[idx].No)
	Length := s.Ships[ship].Length
		fmt.Println(Length)
		for Length > s.Docks[idx].Length {
		fmt.Println(Length)
		Length -= s.Docks[idx].Length
		if s.Docks[idx].BoarderRight != -1 {
			idx = s.getDock(int(s.Docks[idx].BoarderRight))
		} else {
			return make([]int, 0)
		}
		count = append(count, int(s.Docks[idx].No))

	}
	fmt.Println(count)
	return count
}

func (s *ShipStruct) checkTime(doc int, ship int) int {
	out := s.Ships[ship].OutTime
	in := s.Ships[ship].InTime
	dock := s.Docks[doc]
	for i := len(dock.ShipList) - 1; i >= 0; i-- {
		temp := s.Ships[s.getShip(dock.ShipList[i])]
		if temp.OutTime.Before(in) {
			return i + 1
		} else {
			if temp.InTime.Before(out) {
				fmt.Println(doc, " ", dock.ShipList)
				fmt.Println("Error here")
				return -1
			}
		}
	}
	return 0
}

func (s *ShipStruct) setShip(doc int, name string, idx int) {
	if len(s.Docks[doc].ShipList) <= idx {
		temp := make([]string, idx+1)
		for i, k := range s.Docks[doc].ShipList {
			temp[i] = k
		}
		temp[idx] = name
		s.Docks[doc].ShipList = temp
		return
	}
	// if s.Docks[doc].ShipList[idx] == "" {
	// 	s.Docks[doc].ShipList[idx] = name
	// 	return
	// }
	s.Docks[doc].ShipList = append(s.Docks[doc].ShipList[:idx+1], s.Docks[doc].ShipList[idx:]...)
	s.Docks[doc].ShipList[idx] = name
	// i := s.Docks[doc].BoarderRight
	// for i != -1 {
	// 	for rv, j := range s.Docks[i].ShipList {
	// 		checkpoint := false
	// 		for _, k := range s.Docks[doc].ShipList[idx+1:] {
	// 			if j == k {
	// 				s.setShip(int(i), j, rv+1)
	// 				checkpoint = true
	// 				break
	// 			}
	// 		}
	// 		if checkpoint {

	// 			break
	// 		}
	// 	}
	// 	i = s.Docks[i].BoarderRight
	// }

}

func (s *ShipStruct) placeShip(DocPlace int, Name string) {
	fmt.Println(DocPlace, "  ", Name)
	if DocPlace == -1 {
		s.removeShip(Name)
		s.signal <- fmt.Sprintf("Removed Ship %s at time %v", Name, time.Now())
		return
	}
	var rv string = ""
	ship := s.getShip(Name)
	doc := s.getDock(DocPlace)
	if s.Ships[ship].Placed == DocPlace {
		return
	}
	temp := s.Ships[ship].Placed
	if temp != -1 {
		s.removeShip(Name)
	}
	listDoc := s.checkFit(doc, ship)
	idxes := make([]int, 0)
	for _, i := range listDoc {
		j := s.checkTime(i, ship)
		idxes = append(idxes, j)
	}

	for _, i := range idxes {
		if i == -1 {
			s.placeShip(int(temp), Name)
			fmt.Println("End no place")
			return
		}
	}

	s.Ships[ship].Placed = doc
	for k, i := range listDoc {
		s.setShip(i, Name, idxes[k])
	}
	if len(listDoc) == 0 || len(idxes) == 0 {
		fmt.Println("empty")
		return
	}
	rv = fmt.Sprintf("Ship %s has been set to dock(s): %v ; at position %v at time %v", Name, listDoc, idxes, time.Now())
	fmt.Println(rv)
	s.signal <- rv
}

func (s *ShipStruct) getShipLists() [][]string {
	var rv [][]string
	for _, i := range s.Docks {
		rv = append(rv, i.ShipList)
	}
	return rv
}

func (s *ShipStruct) PlaceShip(DocPlace int, Name string) {
	var idx = s.getShip(Name)
	var ship = pb.Ship{
		Name:    s.Ships[idx].Name,
		Placed:  int32(s.Ships[idx].Placed),
		Key:     s.Ships[idx].Key,
		Length:  s.Ships[idx].Length,
		InTime:  timestamppb.New(s.Ships[idx].InTime),
		OutTime: timestamppb.New(s.Ships[idx].OutTime),
		Detail: &pb.Detail{
			From:   s.Ships[idx].Detail.From,
			By:     s.Ships[idx].Detail.By,
			AtTime: s.Ships[idx].Detail.AtTime,
			Owner:  s.Ships[idx].Detail.Owner,
		},
	}

	var sList []*pb.PlaceShip_ShipList = make([]*pb.PlaceShip_ShipList, 0)

	var shipList = s.getShipLists()

	for _, i := range shipList {
		sList = append(sList, &pb.PlaceShip_ShipList{
			List: append([]string{}, i...),
		})
	}

	var moveShip = pb.PlaceShip{
		Ship:       &ship,
		Place:      int32(DocPlace),
		ChangeTime: false,
		ShipList:   sList,
	}
	fmt.Println("Move command invoked")
	s.storeCommand <- moveShip
}

func (s *ShipStruct) removeElement(DocPlace int, Name string) {
	for i, k := range s.Docks[DocPlace].ShipList {
		if k == Name {
			s.Docks[DocPlace].ShipList = append(s.Docks[DocPlace].ShipList[:i], s.Docks[DocPlace].ShipList[i+1:]...)
			return
		}
	}
}

func (s *ShipStruct) removeShip(Name string) {
	ship := s.getShip(Name)
	if s.Ships[ship].Placed == -1 {
		return
	}
	s.Ships[ship].Placed = -1
	for i, _ := range s.Docks {
		s.removeElement(i, Name)
	}
	// s.signal <- fmt.Sprintf("Removed Ship %s at time %v", Name, time.Now())
}

func (s *ShipStruct) parserTime(raw string) time.Time {
	raw = strings.Replace(raw, "Z", "", -1)
	major := strings.Split(raw, "T")
	var date []string = strings.Split(major[0], "-")
	var t []string = strings.Split(major[1], ":")
	datei := make([]int, 0)
	for _, i := range date {
		temp, _ := strconv.Atoi(i)
		datei = append(datei, temp)
	}
	for _, i := range t {
		temp, _ := strconv.Atoi(i)
		datei = append(datei, temp)
	}
	var rv time.Time = time.Date(datei[0], time.Month(datei[1]), datei[2], datei[3], datei[4], 0, 0, time.UTC)
	return rv
}

func (s *ShipStruct) SetTime(Name string, in string, out string) {
	// base := []string{"2000-00-00T00:00", "2000-00-00T00:00:00Z", "2006-01-02T15:04:05.000Z"}
	var outTime, inTime time.Time
	fmt.Println(in, " ", out)
	outTime = s.parserTime(out)
	inTime = s.parserTime(in)
	// for _, i := range base {
	// 	inTime, _ = time.Parse(i, in)
	// 	outTime, _ = time.Parse(i, out)
	// }
	var ship = s.Ships[s.getShip(Name)]
	var req = pb.PlaceShip{
		ChangeTime: true,
		Ship: &pb.Ship{
			Name:    ship.Name,
			InTime:  timestamppb.New(inTime),
			OutTime: timestamppb.New(outTime),
		},
	}
	s.storeCommand <- req
}

func (s *ShipStruct) setTime(Name string, in time.Time, out time.Time) {
	ship := s.getShip(Name)
	s.Ships[ship].InTime = in
	s.Ships[ship].OutTime = out
	s.signal <- fmt.Sprintf("Time changed on ship: %s at time %v", Name, time.Now())
}

func (s *ShipStruct) Initial() *ShipStruct {
	return s
}

func NewShipStruct() *ShipStruct {
	return &ShipStruct{
		Counter: 0,
		Ships: []Ship{
			{
				Name:   "Ship 0",
				Placed: -1,
				Iden:   "0",
				Key:    0,
				Detail: detail{
					From:   "AF",
					AtTime: "15/8/2022",
					By:     "Planner A",
					Owner:  "Ris inc",
				},
				Length:  128,
				InTime:  time.Date(2023, time.February, 15, 18, 30, 0, 0, time.UTC),
				OutTime: time.Date(2023, time.February, 22, 18, 30, 0, 0, time.UTC),
			},
			{
				Name:   "Ship 1",
				Placed: -1,
				Iden:   "1",
				Key:    1,
				Detail: detail{
					From:   "AF_1",
					AtTime: "15/8/2022",
					By:     "Planner A",
					Owner:  "Ris inc",
				},
				Length:  250,
				InTime:  time.Date(2023, time.February, 20, 18, 30, 0, 0, time.UTC),
				OutTime: time.Date(2023, time.February, 27, 18, 30, 0, 0, time.UTC),
			},
			{
				Name:   "Ship 2",
				Placed: -1,
				Iden:   "2",
				Key:    2,
				Detail: detail{
					From:   "AF_2",
					AtTime: "15/8/2022",
					By:     "Planner A",
					Owner:  "Ris inc",
				},
				Length:  128,
				InTime:  time.Date(2023, time.February, 23, 18, 30, 0, 0, time.UTC),
				OutTime: time.Date(2023, time.March, 1, 18, 30, 0, 0, time.UTC),
			},
		},
		Docks: []Doc{
			{
				No:           0,
				Name:         "doc_0",
				Length:       200,
				BoarderRight: 1,
				ShipList:     make([]string, 0),
			},
			{
				No:           1,
				Name:         "doc_1",
				Length:       200,
				BoarderRight: 2,
				ShipList:     make([]string, 0),
			},
			{
				No:           2,
				Name:         "doc_2",
				Length:       200,
				BoarderRight: -1,
				ShipList:     make([]string, 0),
			},
			{
				No:           3,
				Name:         "doc_3",
				Length:       200,
				BoarderRight: 4,
				ShipList:     make([]string, 0),
			},
			{
				No:           4,
				Name:         "doc_4",
				Length:       200,
				BoarderRight: 5,
				ShipList:     make([]string, 0),
			},
			{
				No:           5,
				Name:         "doc_5",
				Length:       200,
				BoarderRight: -1,
				ShipList:     make([]string, 0),
			},
		},
		signal:       make(chan string),
		Log:          make([]string, 0),
		ctx:          context.Background(),
		storeCommand: make(chan pb.PlaceShip),
	}

}
