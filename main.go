package main

import (
	"embed"
	"log"
	"github.com/wailsapp/wails/v2/pkg/options/mac"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed frontend/build
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	// Create an instance of the app structure
	// app := NewApp()
	basic:= NewBasic()

	// var wg sync.WaitGroup
	// go logFunc()
	// go RunServer(&wg)
	
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "react-template",
		Width:  1024,
		Height: 768,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		Assets:            assets,
		LogLevel:          logger.DEBUG,
		OnStartup:         basic.startup,
		OnDomReady:        basic.domReady,
		OnShutdown:        basic.shutdown,
		Bind: []interface{}{
			basic,
		},
		WindowStartState: options.Maximised,
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
		},
		Mac: &mac.Options{
			TitleBar:             mac.TitleBarHiddenInset(),
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "ReactJS Template",
				Message: "Part of the Wails projects",
				Icon:    icon,
			},
		},
	})
	// wg.Wait()
	if err != nil {
		log.Fatal(err)
	}
}
