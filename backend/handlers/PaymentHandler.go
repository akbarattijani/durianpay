package handlers

import (
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

func ListPaymentHandler(paymentData *services.PaymentData) echo.HandlerFunc {
	return func(c echo.Context) error {
		payments := paymentData.ListPayments()

		// filter status
		status := c.QueryParam("status")
		if status != "" {
			payments = services.PaymentsFiltered(status, payments)
		}

		// sorting (default date descending)
		sortParam := c.QueryParam("sort")
		services.PaymentSorting(sortParam, payments)

		// pagination
		page, _ := strconv.Atoi(c.QueryParam("page"))
		out := services.PaymentPagination(page, payments)
		if page < 1 {
			page = 1
		}

		return c.JSON(http.StatusOK, out)
	}
}

func GetTotalPaymentsHandler(paymentData *services.PaymentData) echo.HandlerFunc {
	return func(c echo.Context) error {
		payments := paymentData.ListPayments()

		// filter status
		status := c.QueryParam("status")
		if status != "" {
			payments = services.PaymentsFiltered(status, payments)
		}
		
		return c.JSON(http.StatusOK, map[string]interface{}{
			"count": len(payments),
		})
	}
}

func ReviewPaymentHandler(paymentData *services.PaymentData) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		if id == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "missing id"})
		}

		if err := paymentData.MarkReviewed(id); err != nil {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "payment not found"})
		}

		return c.JSON(http.StatusOK, map[string]string{"status": "reviewed"})
	}
}
