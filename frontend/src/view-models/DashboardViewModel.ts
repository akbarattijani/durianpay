import type { Payment } from "../models/Payment";
import { defineStore } from "pinia";
import { listPaymentService, paymentReviewService, getTotalPaymentService } from "../services/PaymentService";
import axios from "axios";

interface PaymentState {
    payments: Payment[];
    page: number;
    sort: string;
    status: string;
    search: string;
    role: string;
    loading: boolean;
    error: string,
    itemsPerPage: number;
    totalCount: number,
    totalPages: number,
    processingTotal: number,
    completedTotal: number,
    failedTotal: number
}

export const useDashboardViewModel = defineStore("dashboardStore", {
    state: (): PaymentState => ({
        payments: [],
        page: null,
        loading: false,
        error: "",
        sort: null,
        status: null,
        search: "",
        role: null,
        itemsPerPage: 10,
        totalCount: 0,
        totalPages: 1,
        processingTotal: 0,
        completedTotal: 0,
        failedTotal: 0
    }),
    getters: {
        filteredPayments: (state) => {
            let list = state.payments;

            // filter by status
            if (state.status) {
                list = list.filter(p => p.status.toLowerCase() === state.status.toLowerCase());
            }

            // filter by search
            if (state.search.trim() !== "") {
                const term = state.search.toLowerCase();
                list = list.filter(
                    p => (p.id + "").toLowerCase().includes(term) || (p.name + "").toLowerCase().includes(term)
                );
            }

            return list;
        },
        totalPagesArray: (state): number[] => {
            const total = state.totalPages || 1;
            return Array.from({ length: total }, (_, i) => i + 1);
        }
    },
    actions: {
        async fetchTotalCount() {
            this.loading = true;
            try {
                const res = await getTotalPaymentService(this.status);
                this.totalCount = res.count;
                this.totalPages = Math.ceil(res.count / this.itemsPerPage) || 1;

                this.processingTotal = res.processing;
                this.completedTotal = res.completed;
                this.failed = res.failed;
            } catch {
                this.error = "Failed to get total payments count";
            } finally {
                this.loading = false;
            }
        },
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
            const payment = this.payments.find(p => p.id === item.id);
            if (!payment) return;
        
            payment.loading = true;
            this.error = "";
        
            try {
                const status = await paymentReviewService(payment.id);
                if (status < 300) {
                    payment.reviewed = true;
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
                payment.loading = false;
            }
        },

        logout() {
            localStorage.removeItem("AUTH_TOKEN");
            localStorage.removeItem("DURIAN_ROLE");
        },

        goToPage(page: number) {
            this.page = page;
            this.handleListPayment();
        }
    }
});

export function checkAuthentication(): boolean {
    const token = localStorage.getItem("AUTH_TOKEN");
    return !!token;
}

export function getRole(): string {
    return localStorage.getItem("DURIAN_ROLE") || "";
}
