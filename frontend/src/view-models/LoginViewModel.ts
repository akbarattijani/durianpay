import { defineStore } from "pinia";
import type { AuthenticationRequest, AuthenticationResponse } from "../models/Authentication";
import { authenticationService } from "../services/AuthenticationService";
import axios from "axios";

interface LoginState {
    email: string;
    password: string;
    loading: boolean;
    error: string;
    userData: AuthenticationResponse | null;
}

export const useLoginViewModel = defineStore("loginStore", {
    state: (): LoginState => ({
        email: "",
        password: "",
        loading: false,
        error: "",
        userData: <AuthenticationResponse | null>(null),
    }),
    actions: {
        async handleAuthentication() {
            this.loading = true;
            this.error = "";

            try {
                const payload: AuthenticationRequest = {
                    email: this.email,
                    password: this.password,
                };

                const data = await authenticationService(payload);
                this.userData = data;

                return data;
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    this.error = err.response?.data?.message || "Login failed";
                } else {
                    this.error = "Unexpected error";
                }
            } finally {
                this.loading = false;
            }
        }
    }
});