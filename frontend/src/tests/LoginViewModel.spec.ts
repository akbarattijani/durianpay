import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLoginViewModel } from "../../src/view-models/LoginViewModel";
import * as authService from "../../src/services/AuthenticationService";

vi.mock("../../src/services/AuthenticationService");

describe("LoginViewModel", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("handles authentication success", async () => {
    const mockResponse = { token: "123", role: "operation" };
    (authService.authenticationService as any).mockResolvedValue(mockResponse);

    const store = useLoginViewModel();
    store.email = "test@example.com";
    store.password = "password";

    const result = await store.handleAuthentication();
    expect(result).toEqual(mockResponse);
    expect(store.userData).toEqual(mockResponse);
    expect(store.error).toBe("");
  });

  it("handles authentication error", async () => {
    (authService.authenticationService as any).mockRejectedValue(new Error("Login failed"));

    const store = useLoginViewModel();
    store.email = "wrong@example.com";
    store.password = "wrongpass";

    await store.handleAuthentication();
    expect(store.userData).toBeNull();
    expect(store.error).toBe("Unexpected error");
  });
});
