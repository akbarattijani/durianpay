package authentication

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"
)

type MyClaims struct {
	Email string `json:"email"`
	Role  string `json:"role"`
	jwt.RegisteredClaims
}

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		auth := c.Request().Header.Get("Authorization")
		if auth == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "missing authorization"})
		}

		parts := strings.SplitN(auth, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid authorization"})
		}

		// get jwt secret key
		jwtSecret, err := GetJwtSecretKey()
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "JWT Secret Key not found"})
		}

		token := parts[1]
		parser := jwt.NewParser()
		var claims MyClaims
		jwtToken, err := parser.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) { return jwtSecret, nil })
		if err != nil || !jwtToken.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
		}

		// attach to context
		c.Set("user", &MyClaims{Email: claims.Email, Role: claims.Role})
		return next(c)
	}
}

func CheckRole(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := c.Get("user").(*MyClaims)
		if u.Role != "operation" {
			return c.JSON(http.StatusForbidden, map[string]string{"error": "Operation Role required"})
		}

		return next(c)
	}
}
