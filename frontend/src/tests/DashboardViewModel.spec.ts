import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useDashboardViewModel } from "../../src/view-models/DashboardViewModel";
import * as paymentService from "../../src/services/PaymentService";

// Mock service saja
vi.mock("../../src/services/PaymentService", () => ({
  listPaymentService: vi.fn(),
  getTotalPaymentService: vi.fn(),
  paymentReviewService: vi.fn(),
}));

describe("DashboardViewModel", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("fetches payments and sets state", async () => {
    const mockData = [
      { id: "p1", name: "A", amount: 1000, status: "Live", reviewed: false, loading: false, created_at: "" },
    ];

    (paymentService.listPaymentService as any).mockResolvedValue(mockData);
    (paymentService.getTotalPaymentService as any).mockResolvedValue({
      count: 1,
      completed: 0,
      failed: 0,
      processing: 0
    });

    const store = useDashboardViewModel();
    store.page = 1;

    await store.handleListPayment();
    expect(store.payments.length).toBe(1);
    expect(store.payments[0].id).toBe("p1");

    await store.fetchTotalCount();
    expect(store.totalCount).toBe(1);
    expect(store.totalPages).toBe(1);
    expect(store.processingTotal).toBe(0);
    expect(store.completedTotal).toBe(0);
    expect(store.failedTotal).toBe(0);
  });

  it("handles review success", async () => {
    const store = useDashboardViewModel();
    store.payments = [
      { id: "p1", name: "A", amount: 1000, status: "Live", reviewed: false, loading: false, created_at: "" },
    ];

    (paymentService.paymentReviewService as any).mockResolvedValue(200);

    await store.handlePaymentReview(store.payments[0]);
    expect(store.payments[0].reviewed).toBe(true);
  });
});
