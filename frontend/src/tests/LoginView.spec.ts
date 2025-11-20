import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import LoginView from "../../src/views/LoginView.vue";
import * as authService from "../../src/services/AuthenticationService";
import { vi } from "vitest";

// Mock router
const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeEach(() => {
  setActivePinia(createPinia());
  mockPush.mockClear();
});

describe("LoginView Functional", () => {
  it("logs in and redirects", async () => {
    // Mock authenticationService
    const mockResponse = { token: "test-token", role: "admin" };
    vi.spyOn(authService, "authenticationService").mockResolvedValue(mockResponse);

    const wrapper = mount(LoginView, {
      global: {
        plugins: [createPinia()],
      },
    });

    const emailInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find("form");

    await emailInput.setValue("test@example.com");
    await passwordInput.setValue("password");
    await form.trigger("submit.prevent");

    // tunggu async selesai
    await wrapper.vm.$nextTick();

    // sekarang harus terpanggil
    expect(mockPush).toHaveBeenCalledWith("/");

    // loading harus false
    expect(wrapper.vm.viewModel.loading).toBe(false);
  });
});
