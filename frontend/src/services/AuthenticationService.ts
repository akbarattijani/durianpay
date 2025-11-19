import axios from "axios";
import type { AuthenticationRequest, AuthenticationResponse } from "../models/Authentication";

export async function authenticationService(payload: AuthenticationRequest): Promise<AuthenticationResponse> {
    const res = await axios.post("http://localhost:8080/dashboard/v1/auth/login", payload);
    const data: AuthenticationResponse = {
        token: res.data.token,
        role: res.data.role
    };

    // Saving token in local storage
    localStorage.setItem("AUTH_TOKEN", res.data.token);
    localStorage.setItem("DURIAN_ROLE", res.data.role);
    return data;
}