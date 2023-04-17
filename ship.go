package main

import (
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"sync"
	"time"

	pb "github.com/HaiHart/ShipdockServer/proto"
	mx "github.com/gorilla/mux"
	"github.com/wailsapp/wails"
	rt "github.com/wailsapp/wails/v2/pkg/runtime"
	// "golang.org/x/sync/errgroup"
)

type Ship struct {
	Name    string
	Placed  int32
	Iden    string
	Key     int32
	Detail  detail
	InTime  time.Time
	OutTime time.Time
	Length  uint32
}

type Doc struct {
	No           int32
	Name         string
	Length       uint32
	BoarderRight int32
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
	streamConn   pb.Com_MoveContainerClient
	storeCommand chan pb.Pack
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

func (s *ShipStruct) RunServer(wg *sync.WaitGroup) {
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
		var wg sync.WaitGroup
		// go RunServer(&wg)
		go func() {
			for {
				select {
				case event := <-s.signal:
					s.Log = append(s.Log, event)
					rt.EventsEmit(s.ctx, "Ship", s)
				}

			}
		}()
		// go func() {
		// 	var group errgroup.Group
		// 	s.connectServer()
		// 	group.Go(s.FetchFromServer)
		// 	group.Go(s.createServerChannel)
		// 	err := group.Wait()
		// 	if err != nil {
		// 		fmt.Println(err)
		// 		return
		// 	}
		// }()

		wg.Wait()
	}()
	s.signal<-"start"
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
		if i.No == int32(DocPlace) {
			return k
		}
	}
	return -1
}

func (s *ShipStruct) checkFit(doc int, ship int) []int {
	idx := doc
	count := make([]int, s.Docks[idx].BoarderRight)
	Length := s.Ships[ship].Length
	for Length > s.Docks[idx].Length {
		Length -= s.Docks[idx].Length
		if s.Docks[doc].BoarderRight != -1 {
			idx = s.getDock(int(s.Docks[idx].BoarderRight))
		} else {
			return make([]int, 0)
		}
		count = append(count, int(s.Docks[idx].No))

	}
	return count
}

func (s *ShipStruct) checkTime(doc int, ship int) int {
	out := s.Ships[ship].OutTime
	in := s.Ships[ship].InTime
	dock := s.Docks[doc]
	for i := len(dock.ShipList) - 1; i >= 0; i-- {
		if dock.ShipList[i]==""{
			continue
		}
		temp := s.Ships[s.getShip(dock.ShipList[i])]
		if temp.OutTime.Before(in) {
			if i > len(dock.ShipList)-1 {
				prior := s.Ships[s.getShip(dock.ShipList[i+1])]
				if prior.InTime.Before(out) {
					return -1
				}
			}
			return i + 1
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
	s.Docks[doc].ShipList = append(s.Docks[doc].ShipList[:idx+1], s.Docks[doc].ShipList[idx:]...)
	s.Docks[doc].ShipList[idx] = name
	i:= s.Docks[doc].BoarderRight
	for (i!=-1){
		for rv,j:=range s.Docks[i].ShipList{
			checkpoint:=false
			for _,k:=range s.Docks[doc].ShipList[idx+1:]{
				if j==k{
					s.setShip(int(i),j,rv+1)
					checkpoint=true
					break
				}
			}
			if checkpoint {
				break
			}
		}
		i=s.Docks[i].BoarderRight
	}

}

func (s *ShipStruct) PlaceShip(DocPlace int, Name string) {
	var rv string = ""
	ship := s.getShip(Name)
	doc := s.getDock(DocPlace)
	temp:=s.Ships[ship].Placed
	if temp!=-1{
		s.RemoveShip(Name)
	}
	listDoc := s.checkFit(doc, ship)
	var idx int
	idxes := make([]int, 0)
	for i := range listDoc {
		if i == -1 {
			s.PlaceShip(int(temp),Name)
			return
		}
		if i > idx {
			idx = i
		}
	}
	s.Ships[ship].Placed = int32(doc)
	for _, i := range listDoc {
		s.setShip(i, Name, idx)
	}
	rv = fmt.Sprintf("Ship %s has been set to dock(s): %+q ; at position %+q", Name, listDoc, idxes)
	s.signal <- rv
}

func (s *ShipStruct) removeElement(DocPlace int, Name string) {
	for i, k := range s.Docks[DocPlace].ShipList {
		if k == Name {
			s.Docks[DocPlace].ShipList = append(s.Docks[DocPlace].ShipList[:i], s.Docks[DocPlace].ShipList[i+1:]...)
			return
		}
	}
}

func (s *ShipStruct) RemoveShip(Name string) {
	ship := s.getShip(Name)
	s.Ships[ship].Placed = -1
	for i, _ := range s.Docks {
		s.removeElement(i, Name)
	}
}

func (s *ShipStruct)Initial() *ShipStruct {
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
				BoarderRight: 3,
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
		Log:          make([]string, 1),
		ctx:          context.Background(),
		storeCommand: make(chan pb.Pack),
	}

}
