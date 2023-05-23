package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"os"
)

type App struct {
	basic *Basic
	ship  *ShipStruct
}

func NewApp() *App {

	jsonFile, err := os.Open("./ShipSerCon.json")
	if err != nil{
		return nil
	}
	defer jsonFile.Close()
	content, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return nil
	}

	var temp Position
	json.Unmarshal(content, &temp)
	rv := &App{
		basic: NewBasic(),
		ship:  NewShipStruct(temp.ToIP),
	}
	return rv
}

func (a *App) startup(ctx context.Context) {
	go a.basic.startup(ctx)
	go a.ship.startup(ctx)
}

func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}