import axios from "axios";
import type { Payment } from "../models/Payment";
import { PaymentCount } from "../models/PaymentCount";

export async function listPaymentService({page = 1, sort = null, status = null}): Promise<Payment[]> {
    const res = await axios.get("http://localhost:8080/dashboard/v1/payments", {
        params: {
            page: page,
            status: status || undefined,
            sort: sort || undefined,
        },
        headers: {
            Authorization: `Bearer ${getAuthenticationToken()}`,
            "Content-Type": "application/json",
        }
    });

    if (Array.isArray(res.data)) {
        return res.data as Payment[];
    }

    return [];
}

export async function paymentReviewService(id: string): Promise<number> {
    const res = await axios.put(
        `http://localhost:8080/dashboard/v1/payment/${id}/review`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getAuthenticationToken()}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.status;
}

export async function getTotalPaymentService(status: string): Promise<PaymentCount> {
    const res = await axios.get("http://localhost:8080/dashboard/v1/payments/size", {
        params: {
            status: status || undefined
        },
        headers: {
            Authorization: `Bearer ${getAuthenticationToken()}`,
            "Content-Type": "application/json",
        }
    });

    return res.data as PaymentCount;
}

export function getAuthenticationToken(): string {
    const token = localStorage.getItem("AUTH_TOKEN");
    return token;
}

export function isOperationRole(): boolean {
    const role = localStorage.getItem("DURIAN_ROLE");
    return role !== null && role !== undefined && role !== "" && role === "operation";
}