package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"math"
	"net/http"
	"os"
	"strconv"
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

// domReady is called after the front-end dom has been loaded
func (b Basic) domReady(ctx context.Context) {
	// Add your action here
}

// shutdown is called at application termination
func (b *Basic) shutdown(ctx context.Context) {
	// Perform your teardown here
}

var Log chan string = make(chan string)

func logFunc() {
	f, err := os.OpenFile("access.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	defer f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	for {
		select {
		case log := <-Log:
			if _, err := f.Write([]byte(log)); err != nil {
				fmt.Println(err)
			}
		}
	}
}

type Position struct {
	Name     string  `json:"name"`
	ShipName string  `json:"ship"`
	Col      uint16  `json:"col"`
	Row      uint16  `json:"row"`
	XPos     float32 `json:"x"`
	YPos     float32 `json:"y"`
	ToIP     string  `json:"IP"`
}

type detail struct {
	From   string
	AtTime string
	By     string
	Owner  string
}

type Cordinates struct {
	Bay  int
	Row  int
	Tier int
}
type Container struct {
	Name   string
	Cor    Cordinates
	Type   int
	Iden   int
	Key    int
	Detail detail
}

type Command struct {
	name  string
	place int
}

type Basic struct {
	log          *wails.CustomLogger
	runtime      *wails.Runtime
	Counter      int `json:"version"`
	ShipName     string
	Name         string
	Rv           []Container
	Log          []string
	rot          float32
	Inval        []Cordinates
	Bays         int
	Rows         int
	Tiers        int
	CurBay       int
	signal       chan string
	IP           string
	client       pb.ComClient
	ctx          context.Context
	cancle       context.CancelFunc
	streamConn   pb.Com_MoveContainerClient
	storeCommand chan pb.Pack
}

func (b *Basic) connectServer() {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	// conn, err := grpc.Dial(fmt.Sprintf("localhost:%v", 8080), opts...)
	conn, err := grpc.Dial(b.IP, opts...)
	if err != nil {
		fmt.Println(err)
	}
	b.client = pb.NewComClient(conn)
}

func (b *Basic) FetchFromServer() error {
	ShipList, err := b.client.FetchList(b.ctx, &pb.Header{Time: timestamppb.Now(), ShipId: b.ShipName, Name: b.Name})
	if err != nil {
		return err
	}
	b.Bays = int(ShipList.Sizes.Bay)
	b.Rows = int(ShipList.Sizes.Row)
	b.Tiers = int(ShipList.Sizes.Tier)
	b.rot = 40 * float32(b.Tiers)
	b.Rv = make([]Container, 0)
	for _, v := range ShipList.List {
		id, _ := strconv.Atoi(v.Id)
		b.Rv = append(b.Rv, Container{
			Name: v.Name,
			Iden: id,
			Key:  int(v.Key),
			Cor: Cordinates{
				Bay:  int(v.Place.Bay),
				Tier: int(v.Place.Tier),
				Row:  int(v.Place.Row),
			},
			Type: int(v.Type),
			Detail: detail{
				From:   v.Detail.From,
				By:     v.Detail.By,
				Owner:  v.Detail.Owner,
				AtTime: v.Detail.AtTime,
			},
		})
	}
	b.Log = make([]string, 0)
	for _, v := range ShipList.Log {
		b.Log = append(b.Log, v)
	}
	for _, v := range ShipList.Inval {
		b.Inval = append(b.Inval, Cordinates{
			Bay:  int(v.Bay),
			Row:  int(v.Row),
			Tier: int(v.Tier),
		})
	}
	rt.EventsEmit(b.ctx, "List", b)
	return nil
}

func (b *Basic) createServerChannel() error {
	stream, err := b.client.MoveContainer(b.ctx)
	if err != nil {
		fmt.Println(err)
	}
	// waitc := make(chan struct{})
	go func() {
		b.streamConn = stream
		for {
			in, err := stream.Recv()
			if err == io.EOF {
				stream, err = b.client.MoveContainer(b.ctx)
				var wait = 1
				for err != nil {
					time.Sleep(time.Duration(wait) * time.Second)
					stream, err = b.client.MoveContainer(b.ctx)
					if wait < 100 {
						wait = wait * 2
					}
				}

				b.streamConn = stream
				continue
			}
			if in.ShipName != b.ShipName{
				continue
			}
			if err != nil {
				fmt.Println(err)
			}
			if in.Err != "None" {
				b.FetchFromServer()
				continue
			}
			fmt.Println(in.List[0].Id, (in.List[0].NewPlace))
			place := Cordinates{
				Bay:  (int(in.List[0].NewPlace.Bay)),
				Row:  int(in.List[0].NewPlace.Row),
				Tier: int(in.List[0].NewPlace.Tier),
			}
			b.Change(in.List[0].Id, place)
		}
	}()
	go func() {
		fmt.Println("runnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
		for {
			select {
			case commmand := <-b.storeCommand:
				err := stream.Send(&commmand)
				if err != nil {
					fmt.Println("send command to somewhere: %v", err)
				}
				fmt.Println("Yesssssssssssss")
			}
		}
	}()

	return nil
}

// func (b *Basic) getRV(index int) *Container {
// 	return &Container{
// 		Iden:   b.Rv[index].Iden,
// 		Name:   b.Rv[index].Name,
// 		Placed: b.Rv[index].Placed,
// 	}
// }

func (b *Basic) startup(ctx context.Context) {
	b.ctx = ctx
	b.GetImageFile()
	go func() {
		var wg sync.WaitGroup
		go logFunc()
		go RunServer(&wg)
		go func() {
			for {
				select {
				case event := <-b.signal:
					b.Log = append(b.Log, event)
					rt.EventsEmit(b.ctx, "List", b)
				}

			}
		}()
		go func() {
			var group errgroup.Group
			b.connectServer()
			group.Go(b.FetchFromServer)
			group.Go(b.createServerChannel)
			err := group.Wait()
			if err != nil {
				fmt.Println(err)
				return
			}
		}()

		wg.Wait()
	}()

}

func (b *Basic) checkFlip(index int, bay int, row int, tier int) bool {

	for _, v := range b.Rv {
		if v.Iden == index {
			if v.Cor.Bay == bay && v.Cor.Row == row && v.Cor.Tier == tier {
				return false
			}
			if v.Name == "x" && bay == -1 {
				return false
			}
		}
	}

	for _, v := range b.Inval {
		if v.Bay == bay && v.Row == row && v.Tier == tier {
			return false
		}
	}

	return true
}

func (b *Basic) Bay(bay int) {
	b.CurBay = bay
}

func (b *Basic) CheckImabalance() string {
	temp := make(map[int]float32, b.Bays)

	for i := 0; i < b.Bays; i++ {
		temp[i] = 0
	}

	for _, i := range b.Rv {
		if i.Cor.Bay != -1 {
			w := 40 + i.Type*40
			if i.Cor.Row <= b.Rows/2 {
				temp[i.Cor.Bay] += float32(w) * float32(float32(b.Rows/2-i.Cor.Row)/(float32(b.Rows/2)+float32(b.Rows-(b.Rows/2)*2)/2*float32(b.Rows)))
			}
			if i.Cor.Row >= b.Rows/2+b.Rows%2 {
				temp[i.Cor.Bay] -= float32(w) * float32(float32(i.Cor.Row-b.Rows/2+1)/(float32(b.Rows/2)+float32(b.Rows-(b.Rows/2)*2)/2*float32(b.Rows)))
			}
		}
	}

	var max_index int

	var max float64

	// defer fmt.Println(tmp[max_index], max_index)

	for u, v := range temp {
		if math.Abs(float64(v)) > max {
			max_index = u
			max = math.Abs(float64(v))
		}
	}

	if temp[max_index] != 0 {
		b.CurBay = max_index
		fmt.Println(temp[max_index], max_index)
		rt.EventsEmit(b.ctx, "List", b)
		return strconv.Itoa(max_index + 1)
	}

	return "no"
}

// func (b *Basic) Flip(x string, bay int, row int, tier int) *Basic {
func (b *Basic) Flip(x string, id int) *Basic {
	fmt.Println(x)
	if x == "yes" {
		return b
	}
	index, err := strconv.Atoi(x)
	if err != nil {
		fmt.Printf("%v", err)
		return b
	}

	// bay := id / (b.Rows * b.Tiers)

	bay := b.CurBay

	step := id % (b.Rows * b.Tiers)

	tier := step / b.Rows

	row := step % b.Rows

	if id < 0 {
		bay = -1
		row = -1
		tier = -1
	}

	if b.checkFlip(index, bay, row, tier) == false {
		return b
	}

	var change, change_2 *pb.Container
	for _, v := range b.Rv {
		if v.Iden == index {
			fmt.Println("container place ", v.Cor)
			change = &pb.Container{
				Id:   strconv.FormatInt(int64(v.Iden), 10),
				Name: v.Name,
				Type: int32(v.Type),
				Place: &pb.Cordinate{
					Bay:  int32(v.Cor.Bay),
					Row:  int32(v.Cor.Row),
					Tier: int32(v.Cor.Tier),
				},
				NewPlace: &pb.Cordinate{
					Bay:  int32(bay),
					Row:  int32(row),
					Tier: int32(tier),
				},
				Time: timestamppb.Now(),
				Detail: &pb.Detail{
					From:   v.Detail.From,
					By:     v.Detail.By,
					AtTime: v.Detail.AtTime,
					Owner:  v.Detail.Owner,
				},
			}
			if bay != -1 && row != -1 && tier != -1 {
				for _, j := range b.Rv {
					if j.Cor.Bay == bay && j.Cor.Row == row && j.Cor.Tier == tier {

						change_2 = &pb.Container{
							Id:   strconv.FormatInt(int64(j.Iden), 10),
							Name: j.Name,
							Place: &pb.Cordinate{
								Bay:  int32(j.Cor.Bay),
								Row:  int32(j.Cor.Row),
								Tier: int32(j.Cor.Tier),
							},
							NewPlace: &pb.Cordinate{
								Bay:  int32(v.Cor.Bay),
								Row:  int32(v.Cor.Row),
								Tier: int32(v.Cor.Tier),
							},
							Time: timestamppb.Now(),
							Detail: &pb.Detail{
								From:   j.Detail.From,
								By:     j.Detail.By,
								AtTime: j.Detail.AtTime,
								Owner:  j.Detail.Owner,
							},
						}
					}
				}

			}

		}
	}
	var ls = pb.Pack{
		List: []*pb.Container{
			change,
			change_2,
		},
		ShipName: b.ShipName,
		Swap:     (change_2 != nil),
		Err:      "None",
		Name:     b.Name,
	}
	b.storeCommand <- ls
	fmt.Println("Here!!!!!!!!!!!!!!!!!!!!!!!!!!! ", bay, row, tier)
	fmt.Println("container place ", change.Place)
	return b
}

func (b *Basic) Change(x string, place Cordinates) *Basic {
	fmt.Println("receive from server: ", x)

	index, err := strconv.Atoi(x)
	if err != nil {
		fmt.Printf("%v", err)
		return b
	}
	var rv string = ""

	for k, v := range b.Rv {
		if v.Iden == index {
			b.Counter++
			if place.Bay == -1 {
				// (b.Rv)[k] = Container{
				// 	Iden:   v.Iden,
				// 	Name:   v.Name,
				// 	Placed: id,
				// 	Detail: detail{
				// 		From:   v.Detail.From,
				// 		By:     v.Detail.By,
				// 		AtTime: v.Detail.AtTime,
				// 		Owner:  v.Detail.Owner,
				// 	},
				// }
				b.Rv[k].Cor.Bay = place.Bay
				b.Rv[k].Cor.Row = place.Row
				b.Rv[k].Cor.Tier = place.Tier
				rv = string(fmt.Sprintf("%s is moved to %v at %v", v.Name, place, time.Now().Format(time.ANSIC)))

			} else {
				for i, j := range b.Rv {
					if j.Cor.Bay == place.Bay && j.Cor.Row == place.Row && j.Cor.Tier == place.Tier {
						// (b.Rv)[i] = Container{
						// 	Iden:   j.Iden,
						// 	Name:   j.Name,
						// 	Placed: v.Placed,
						// 	Detail: detail{
						// 		From:   j.Detail.From,
						// 		By:     j.Detail.By,
						// 		AtTime: j.Detail.AtTime,
						// 		Owner:  j.Detail.Owner,
						// 	},
						// }
						b.Rv[i].Cor.Bay = v.Cor.Bay
						b.Rv[i].Cor.Row = v.Cor.Row
						b.Rv[i].Cor.Tier = v.Cor.Tier
						rv = string(fmt.Sprintf("%s is switched with %d at %v", v.Name, j.Iden, time.Now().Format(time.ANSIC)))

					}
				}
				// (b.Rv)[k] = Container{
				// 	Iden:   v.Iden,
				// 	Name:   v.Name,
				// 	Placed: id,
				// 	Detail: detail{
				// 		From:   v.Detail.From,
				// 		By:     v.Detail.By,
				// 		AtTime: v.Detail.AtTime,
				// 		Owner:  v.Detail.Owner,
				// 	},
				// }
				b.Rv[k].Cor.Bay = place.Bay
				b.Rv[k].Cor.Row = place.Row
				b.Rv[k].Cor.Tier = place.Tier
				if len(rv) < 1 {
					rv = string(fmt.Sprintf("%s is moved to %v at %v", v.Name, place, time.Now().Format(time.ANSIC)))
				}
			}

		}
	}
	b.signal <- rv
	return b
}

func (b *Basic) SetImageFile(x float32, y float32, col int16, row int16) string {

	toJson := Position{
		ShipName: b.ShipName,
		XPos:     x,
		YPos:     y,
		Col:      uint16(col),
		Row:      uint16(row),
		ToIP:     b.IP,
	}
	file, err := json.Marshal(toJson)
	if err != nil {
		return fmt.Sprintln((err))
	}

	err = ioutil.WriteFile("./Config.json", file, 0644)

	if err != nil {
		fmt.Println(err)
	}

	return "success"
}

func (b *Basic) RemoveImage() string {
	if err := os.Remove("./image.jpg"); err != nil {
		return fmt.Sprintln(err)
	}
	return "Success"
}

func (b *Basic) GetImageFile() interface{} {
	jsonFile, err := os.Open("./Config.json")
	if err != nil {
		fmt.Println(err)
		return Position{
			Name:     "",
			ShipName: "",
			XPos:     0,
			YPos:     0,
			Col:      5,
			Row:      2,
			ToIP:     "",
		}
	}
	defer jsonFile.Close()
	content, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return Position{
			Name:     "",
			ShipName: "",
			XPos:     0,
			YPos:     0,
			Col:      5,
			Row:      2,
			ToIP:     "",
		}
	}

	var rv Position

	json.Unmarshal(content, &rv)
	b.IP = rv.ToIP
	b.ShipName = rv.ShipName
	b.Name = rv.Name
	return rv
}

func imgLoader(w http.ResponseWriter, r *http.Request) {
	var Path = "./" + "image.jpg"
	img, err := ioutil.ReadFile(Path)
	if err != nil {
		Log <- fmt.Sprintf("%v", err)
		fmt.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "img/jpeg")
	w.Write(img)
}

func imgUpload(w http.ResponseWriter, r *http.Request) {
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
	tmpFile, err := os.Create("./image.jpg")
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

func checkConn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Header().Add("Accept-Charset", "utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Yes")
}

func RunServer(wg *sync.WaitGroup) {
	defer wg.Done()
	wg.Add(1)
	r := mx.NewRouter()
	r.HandleFunc("/img", imgLoader)
	r.HandleFunc("/Conn", checkConn)
	r.HandleFunc("/save", imgUpload)
	http.Handle("/", r)
	err := http.ListenAndServe(":4000", nil)
	if err != nil {
		fmt.Println(err)
	}
}

func NewBasic() *Basic {
	return &Basic{
		Counter:      0,
		Rv:           make([]Container, 0),
		Inval:        make([]Cordinates, 0),
		Rows:         0,
		Bays:         0,
		Tiers:        0,
		CurBay:       0,
		signal:       make(chan string),
		Log:          make([]string, 1),
		ctx:          context.Background(),
		storeCommand: make(chan pb.Pack),
		// ShipName: Ship_name,
	}
}

func NewBasi() {
	var wg sync.WaitGroup

	go logFunc()
	go RunServer(&wg)

	wg.Wait()
	defer fmt.Println("DONE")
}
