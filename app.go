package main

import (
	"context"
	"encoding/json"
	"fmt"
	pb "github.com/HaiHart/ShipdockServer/proto"
	mx "github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"sync"
	"time"
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
	Col  uint16  `json:"col"`
	Row  uint16  `json:"row"`
	XPos float32 `json:"x"`
	YPos float32 `json:"y"`
	ToIP string  `json:"IP"`
}

type detail struct {
	From   string
	AtTime string
	By     string
	Owner  string
}
type Container struct {
	Name   string
	Placed int
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
	Rv           []Container
	Log          []string
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
	// defer conn.Close()
}

func (b *Basic) FetchFromServer() error {
	ShipList, err := b.client.FetchList(b.ctx, &pb.Header{Time: timestamppb.Now()})
	if err != nil {
		return err
	}
	b.Rv = make([]Container, 0)
	for _, v := range ShipList.List {
		id, _ := strconv.Atoi(v.Id)
		b.Rv = append(b.Rv, Container{
			Name:   v.Name,
			Iden:   id,
			Key:    int(v.Key),
			Placed: int(v.Place),
			Detail: detail{
				From: v.Detail.From,
				By: v.Detail.By,
				Owner: v.Detail.Owner,
				AtTime: v.Detail.AtTime,

			},
		})
	}
	for _, v := range ShipList.Log {
		b.Log = append(b.Log, v)
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
			if err != nil {
				fmt.Println(err)
			}
			if in.Err != "None" {
				b.FetchFromServer()
				continue
			}
			fmt.Println(in.List[0].Id, int(in.List[0].NewPlace))
			b.Change(in.List[0].Id, int(in.List[0].NewPlace))
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

	// <-waitc
	return nil
}

func (b *Basic) getRV(index int) *Container {
	return &Container{
		Iden:   b.Rv[index].Iden,
		Name:   b.Rv[index].Name,
		Placed: b.Rv[index].Placed,
	}
}

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
	var change, change_2 *pb.Container
	for _, v := range b.Rv {
		if v.Iden == index {
			change = &pb.Container{
				Id:       strconv.FormatInt(int64(v.Iden), 10),
				Name:     v.Name,
				Place:    int32(v.Placed),
				NewPlace: int32(id),
				Time:     timestamppb.Now(),
				Detail: &pb.Detail{
					From:   v.Detail.From,
					By:     v.Detail.By,
					AtTime: v.Detail.AtTime,
					Owner:  v.Detail.Owner,
				},
			}
			if id != -1 {
				for _, j := range b.Rv {
					if j.Placed == id {
						
						change_2 = &pb.Container{
							Id:       strconv.FormatInt(int64(j.Iden), 10),
							Name:     j.Name,
							Place:    int32(j.Placed),
							NewPlace: int32(v.Placed),
							Time:     timestamppb.Now(),
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
		Swap: (change_2 != nil),
		Err:  "None",
	}
	b.storeCommand <- ls
	fmt.Println("Here!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	return b
}

func (b *Basic) Change(x string, id int) *Basic {
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
			if id == -1 {
				(b.Rv)[k] = Container{
					Iden:   v.Iden,
					Name:   v.Name,
					Placed: id,
					Detail: detail{
						From:   v.Detail.From,
						By:     v.Detail.By,
						AtTime: v.Detail.AtTime,
						Owner:  v.Detail.Owner,
					},
				}
				rv = string(fmt.Sprintf("%s is moved to %d at %v", v.Name, id, time.Now().Format(time.ANSIC)))

			} else {
				for i, j := range b.Rv {
					if j.Placed == id {
						(b.Rv)[i] = Container{
							Iden:   j.Iden,
							Name:   j.Name,
							Placed: v.Placed,
							Detail: detail{
								From:   j.Detail.From,
								By:     j.Detail.By,
								AtTime: j.Detail.AtTime,
								Owner:  j.Detail.Owner,
							},
						}
						rv = string(fmt.Sprintf("%s is switched with %d at %v", v.Name, j.Iden, time.Now().Format(time.ANSIC)))

					}
				}
				(b.Rv)[k] = Container{
					Iden:   v.Iden,
					Name:   v.Name,
					Placed: id,
					Detail: detail{
						From:   v.Detail.From,
						By:     v.Detail.By,
						AtTime: v.Detail.AtTime,
						Owner:  v.Detail.Owner,
					},
				}
				if len(rv) < 1 {
					rv = string(fmt.Sprintf("%s is moved to %d at %v", v.Name, id, time.Now().Format(time.ANSIC)))
				}
			}

		}
	}
	// b.sort()
	b.signal <- rv
	return b
}

func (b *Basic) SetImageFile(x float32, y float32, col int16, row int16) string {

	toJson := Position{
		XPos: x,
		YPos: y,
		Col:  uint16(col),
		Row:  uint16(row),
		ToIP: b.IP,
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
			XPos: 0,
			YPos: 0,
			Col:  5,
			Row:  2,
			ToIP: "",
		}
	}
	defer jsonFile.Close()
	content, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return Position{
			XPos: 0,
			YPos: 0,
			Col:  5,
			Row:  2,
			ToIP: "",
		}
	}

	var rv Position

	json.Unmarshal(content, &rv)
	b.IP=rv.ToIP

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
		Counter: 0,
		Rv: []Container{{
			Iden:   1,
			Name:   "1",
			Placed: -1,
			Key:    0,
		},
			{
				Iden:   2,
				Name:   "2",
				Placed: -1,
				Key:    1,
			},
			{
				Iden:   3,
				Name:   "3",
				Placed: -1,
				Key:    2,
			}},
		signal:       make(chan string),
		Log:          make([]string, 1),
		ctx:          context.Background(),
		storeCommand: make(chan pb.Pack),
	}
}

func NewBasi() {
	var wg sync.WaitGroup

	go logFunc()
	go RunServer(&wg)

	wg.Wait()
	defer fmt.Println("DONE")
}
