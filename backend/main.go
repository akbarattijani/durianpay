package main

import (
	"Durianpay/routes"
	"Durianpay/util"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	util.LoadEnv()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	routes.RegisterRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
