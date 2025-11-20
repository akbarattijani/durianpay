package handlers

import (
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"strings"
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
		allPayments := paymentData.ListPayments()
		totalStatusCounts := map[string]int{
			"processing": 0,
			"completed":  0,
			"failed":     0,
		}
		for _, p := range allPayments {
			status := strings.ToLower(string(p.Status))
			switch status {
			case "processing":
				totalStatusCounts["processing"]++
			case "completed":
				totalStatusCounts["completed"]++
			case "failed":
				totalStatusCounts["failed"]++
			}
		}

		filterStatus := c.QueryParam("status")
		filteredPayments := allPayments
		if filterStatus != "" {
			filteredPayments = services.PaymentsFiltered(filterStatus, allPayments)
		}

		response := map[string]int{
			"count":      len(filteredPayments),
			"processing": totalStatusCounts["processing"],
			"completed":  totalStatusCounts["completed"],
			"failed":     totalStatusCounts["failed"],
		}

		return c.JSON(http.StatusOK, response)
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
