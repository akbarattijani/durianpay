package routes

import (
	"Durianpay/handlers"
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

func RegisterRoutes(e *echo.Echo) *echo.Echo {
	payments := services.NewPayment()

	//Enable CORS globally
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // for real server, put URLs, example "http://localhost:5173", "https://duran.money.api.com, and others
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete, http.MethodOptions},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	v1 := e.Group("/dashboard/v1")
	e.Logger.Fatal(e.Start(":8080"))
	v1.POST("/auth/login", handlers.AuthHandler)

	// protected group
	v1.GET("/payments", handlers.ListPaymentHandler(payments), services.AuthMiddleware)
	v1.GET("/payments/size", handlers.GetTotalPaymentsHandler(payments), services.AuthMiddleware)
	v1.PUT("/payment/:id/review", handlers.ReviewPaymentHandler(payments), services.AuthMiddleware, services.CheckRole)

	// health
	e.GET("/", func(c echo.Context) error { return c.String(http.StatusOK, "ok") })

	return e
}
