import type { Payment } from "../models/Payment";
import { defineStore } from "pinia";
import { listPaymentService, paymentReviewService } from "../services/PaymentService";
import axios from "axios";

interface PaymentState {
    payments: Payment[];
    page: number;
    sort: string;
    status: string;
    search: string;
    role: string;
    loading: boolean;
    error: string
}

export const useDasboardViewModel = defineStore("loginStore", {
    state: (): PaymentState => ({
        payments: [],
        page: null,
        loading: false,
        error: "",
        sort: null,
        status: null,
        search: "",
        role: null
    }),
    actions: {
        async handleListPayment() {
            this.loading = true;
            this.error = "";
        
            try {
                const data = await listPaymentService({
                    page: this.page,
                    sort: this.sort,
                    status: this.status,
                });
        
                this.payments = (data || []).map(p => ({
                    ...p,
                    loading: false
                }));
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    this.error = err.response?.data?.message || "Get payments data failed";
                } else {
                    this.error = "Unexpected error";
                }
            } finally {
                this.loading = false;
            }
        },

        async handlePaymentReview(item: Payment) {
            item.loading = true;
            this.error = "";
        
            try {
                const data = await paymentReviewService(item.id);
                if (data < 300) {
                    const item = this.payments.find(payment => payment.id === item.id);
                    if (item) {
                        item.reviewed = true;
                    }
                } else {
                    this.error = "Review payment failed, try again...";
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    this.error = err.response?.data?.message || "Review payment failed";
                } else {
                    this.error = "Unexpected error";
                }
            } finally {
                item.loading = false;
            }
        }
    }
});

export default function checkAuthentication(): boolean {
    const token = localStorage.getItem("AUTH_TOKEN");
    return token !== null && token !== undefined && token !== "";
}
