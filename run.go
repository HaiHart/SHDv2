package main

import "context"

type App struct {
	basic *Basic
	ship  *ShipStruct
}

func NewApp() *App {
	rv := &App{
		basic: NewBasic(),
		ship:  NewShipStruct(),
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