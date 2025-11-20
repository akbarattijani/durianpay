import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ListView from "../../src/components/ListView.vue";
import type { Payment } from "../../src/models/Payment";

describe("ListView.vue", () => {

  const sampleItems: Payment[] = [
    { id: "p1", name: "Toko Sakura", amount: 150000, status: "Live", reviewed: false, created_at: "2025-01-01T10:00:00Z", loading: false },
    { id: "p2", name: "Bakery Joy", amount: 250500, status: "Completed", reviewed: true, created_at: "2025-02-01T12:00:00Z", loading: false },
    { id: "p3", name: "Cafe Latte", amount: 100000, status: "Processing", reviewed: false, created_at: "2025-03-01T14:00:00Z", loading: true },
  ];

  it("renders all items correctly", () => {
    /**
     * Test 1:
     * - Render props 'items'
     */
    const wrapper = mount(ListView, {
      props: {
        items: sampleItems,
        role: "operation",
      },
    });

    const cards = wrapper.findAll(".branch-card");
    expect(cards.length).toBe(sampleItems.length);

    sampleItems.forEach((item, idx) => {
      expect(cards[idx].text()).toContain(item.name);
      expect(cards[idx].text()).toContain(item.id);
    });
  });

  it("formats amount and date correctly", () => {
    /**
     * Test 2:
     * - Amount format in "IDR" + number locale id-ID
     * - Date format in "dd MMM yyyy"
     */
    const wrapper = mount(ListView, {
      props: { items: sampleItems, role: "operation" },
    });

    const firstCard = wrapper.findAll(".branch-card")[0];
    expect(firstCard.text()).toContain("IDR 150.000");

    const secondCard = wrapper.findAll(".branch-card")[1];
    expect(secondCard.text()).toContain("01 Feb 2025");
  });

  it("displays status badge correctly", () => {
    /**
     * Test 3:
     * - Status badge show per item
     * - Status is lowercase
     */
    const wrapper = mount(ListView, { props: { items: sampleItems, role: "operation" } });
    const badges = wrapper.findAll(".status");

    expect(badges[0].text()).toBe("LIVE");
    expect(badges[0].classes()).toContain("live");

    expect(badges[1].text()).toBe("COMPLETED");
    expect(badges[1].classes()).toContain("completed");

    expect(badges[2].text()).toBe("PROCESSING");
    expect(badges[2].classes()).toContain("processing");
  });

  it("shows 'Reviewed' text for reviewed items", () => {
    /**
     * Test 4:
     * - Item with reviewed = true show div .reviewed
     */
    const wrapper = mount(ListView, { props: { items: sampleItems, role: "operation" } });
    const reviewedDiv = wrapper.find(".branch-card:nth-child(2) .reviewed");
    expect(reviewedDiv.exists()).toBe(true);
    expect(reviewedDiv.text()).toBe("Reviewed");
  });

  it("shows review button only for operation role and non-reviewed items", () => {
    /**
     * Test 5:
     * - Button Mark as Reviewed show if role = 'operation'
     * - Button Mark as Reviewed hide if reviewed = true
     */
    const wrapper = mount(ListView, { props: { items: sampleItems, role: "operation" } });

    const firstButton = wrapper.find(".branch-card:nth-child(1) button");
    expect(firstButton.exists()).toBe(true);
    expect(firstButton.text()).toBe("Mark as Reviewed");

    const secondButton = wrapper.find(".branch-card:nth-child(2) button");
    expect(secondButton.exists()).toBe(false);
  });

  it("disables review button when item.loading = true", () => {
    /**
     * Test 6:
     * - Button Mark as Reviewed is disabled if item.loading = true
     */
    const wrapper = mount(ListView, { props: { items: sampleItems, role: "operation" } });
    const thirdButton = wrapper.find(".branch-card:nth-child(3) button");
    expect(thirdButton.attributes("disabled")).toBeDefined();
    expect(thirdButton.text()).toBe("Loading...");
  });

  it("emits 'review' event when review button clicked", async () => {
    /**
     * Test 7:
     * - Button Mark as Reviewed is clicked, emit 'review'
     */
    const wrapper = mount(ListView, { props: { items: sampleItems, role: "operation" } });
    const firstButton = wrapper.find(".branch-card:nth-child(1) button");

    await firstButton.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("review");
    expect(wrapper.emitted("review")[0][0]).toEqual(sampleItems[0]);
  });
});
