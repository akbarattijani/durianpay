import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import DashboardView from "../../src/views/DashboardView.vue";
import { describe, it, beforeEach, vi, expect } from "vitest";

const mockPush = vi.fn();

// Mock router
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock DashboardViewModel
vi.mock("../../src/view-models/DashboardViewModel", () => ({
  useDashboardViewModel: () => {
    const state = {
      page: 1,
      sort: null,
      status: null,
      role: "operation",
      loading: false,
      totalPagesArray: [1, 2, 3],
      filteredPayments: [
        { id: "p1", name: "Toko Sakura", amount: 10000, status: "completed", reviewed: false },
        { id: "p2", name: "Bakery Joy", amount: 5000, status: "processing", reviewed: true },
      ],
      handleListPayment: vi.fn(),
      fetchTotalCount: vi.fn(),
      handlePaymentReview: vi.fn(),
      goToPage: vi.fn((p: number) => { state.page = p; }),
      logout: vi.fn(),
    };
    return state;
  },
  checkAuthentication: () => true,
  getRole: () => "operation",
}));

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe("DashboardView.vue", () => {
  it("renders ListView and calls viewmodel methods on mount", async () => {
    const wrapper = mount(DashboardView, {
      global: { plugins: [createPinia()] },
    });

    await flushPromises();

    expect(wrapper.findComponent({ name: "ListView" }).exists()).toBe(true);
    expect(wrapper.findAll(".pagination button").length).toBe(3);

    const logoutBtn = wrapper.find(".logout-btn");
    await logoutBtn.trigger("click");
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("updates page when pagination button clicked", async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [createPinia()] } });
    await flushPromises();

    const store = wrapper.vm.viewModel;
    const pageBtn = wrapper.find(".pagination button:nth-child(2)");
    await pageBtn.trigger("click");

    expect(store.page).toBe(2);
    expect(store.goToPage).toHaveBeenCalledWith(2);
  });

  it("emits review event to viewmodel", async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [createPinia()] } });
    await flushPromises();

    const store = wrapper.vm.viewModel;
    const listView = wrapper.findComponent({ name: "ListView" });

    await listView.vm.$emit("review", store.filteredPayments[0]);
    expect(store.handlePaymentReview).toHaveBeenCalledWith(store.filteredPayments[0]);
  });

  it("handles logout correctly", async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [createPinia()] } });
    await flushPromises();

    const logoutBtn = wrapper.find(".logout-btn");
    await logoutBtn.trigger("click");

    const store = wrapper.vm.viewModel;
    expect(store.logout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
