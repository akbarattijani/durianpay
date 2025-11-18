package handlers

import (
	"Durianpay/models"
	"Durianpay/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func AuthHandler(context echo.Context) error {
	var request models.AuthenticationRequest
	if err := context.Bind(&request); err != nil {
		return context.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
	}
	u, ok := services.Users[request.Email]
	if !ok || request.Password != u.Password {
		return context.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
	}

	jwtToken, err := services.GetJwtToken(request)
	if err != nil {
		return context.JSON(http.StatusInternalServerError, map[string]string{"error": "could not create token"})
	}

	return context.JSON(http.StatusOK, models.AuthenticationResponse{Token: jwtToken, Role: u.Role})
}
