package routes

import (
	"Durianpay/handlers"
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterRoutes(e *echo.Echo) *echo.Echo {
	payments := services.NewPayment()

	v1 := e.Group("/dashboard/v1")
	v1.POST("/auth/login", handlers.AuthHandler)

	// protected group
	v1.GET("/payments", handlers.ListPaymentHandler(payments), services.AuthMiddleware)
	v1.PATCH("/payment/:id/review", handlers.ReviewPaymentHandler(payments), services.AuthMiddleware, services.CheckRole)

	// health
	e.GET("/", func(c echo.Context) error { return c.String(http.StatusOK, "ok") })

	return e
}
