import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useDasboardViewModel } from "../../src/view-models/DashboardViewModel";
import * as paymentService from "../../src/services/PaymentService";

vi.mock("../../src/services/PaymentService");

describe("DashboardViewModel", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetches payments and sets state", async () => {
    const mockData = [
      { id: "p1", name: "A", amount: 1000, status: "Live", reviewed: false },
    ];

    (paymentService.listPaymentService as any).mockResolvedValue(mockData);
    (paymentService.getTotalPaymentService as any).mockResolvedValue(1);

    const store = useDasboardViewModel();
    store.page = 1;

    await store.handleListPayment();
    expect(store.payments.length).toBe(1);
    expect(store.payments[0].id).toBe("p1");

    await store.fetchTotalCount();
    expect(store.totalCount).toBe(1);
    expect(store.totalPages).toBe(1);
  });

  it("handles review success", async () => {
    const store = useDasboardViewModel();
    store.payments = [{ id: "p1", name: "A", amount: 1000, status: "Live", reviewed: false, loading: false }];
    (paymentService.paymentReviewService as any).mockResolvedValue(200);

    await store.handlePaymentReview(store.payments[0]);
    expect(store.payments[0].reviewed).toBe(true);
  });
});
