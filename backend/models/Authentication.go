package models

type AuthenticationRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthenticationResponse struct {
	Token string `json:"token"`
	Role  string `json:"role"`
}
