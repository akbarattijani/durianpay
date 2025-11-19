export interface AuthenticationResponse {
    token: string;
    role: string
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}