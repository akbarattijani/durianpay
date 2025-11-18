package main

import (
	"Durianpay/handlers"
	"Durianpay/services"
	"Durianpay/util"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	util.LoadEnv()

	payments := services.NewPayment()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	v1 := e.Group("/dashboard/v1")
	v1.POST("/auth/login", handlers.AuthHandler)

	// protected group
	v1.GET("/payments", handlers.ListPaymentHandler(payments), services.AuthMiddleware)
	v1.POST("/payment/:id/review", handlers.ReviewPaymentHandler(payments), services.AuthMiddleware, services.CheckRole)

	// health
	e.GET("/", func(c echo.Context) error { return c.String(http.StatusOK, "ok") })

	e.Logger.Fatal(e.Start(":8080"))
}
