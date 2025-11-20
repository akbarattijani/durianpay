import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import EditField from "../../src/components/EditField.vue";

describe("EditField.vue", () => {

  it("renders label and placeholder correctly", () => {
    /**
     * Test 1:
     * - Label prop show <label>
     * - Placeholder prop show <placeholder>
     */
    const wrapper = mount(EditField, {
      props: {
        label: "Email",
        placeholder: "Enter your email",
      },
    });

    const label = wrapper.find("label");
    const input = wrapper.find("input");

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Email");
    expect(input.attributes("placeholder")).toBe("Enter your email");
  });

  it("v-model works when typing", async () => {
    /**
     * Test 2:
     * - Listener event 'update:modelValue' is calling
     * - Parent data (v-model) is updated when typing
     */
    let modelValue = "";
    const wrapper = mount(EditField, {
      props: {
        modelValue,
        "onUpdate:modelValue": (val: string) => (modelValue = val),
      },
    });

    const input = wrapper.find("input");
    await input.setValue("test@example.com");

    expect(modelValue).toBe("test@example.com");
  });

  it("toggles password visibility", async () => {
    /**
     * Test 3:
     * - Show/Hide button show when type="password"
     * - Clicked when 'Show' & 'Hide'
     */
    const wrapper = mount(EditField, {
      props: {
        type: "password",
      },
    });

    const input = wrapper.find("input");
    const button = wrapper.find("button.toggle-btn");

    expect(input.attributes("type")).toBe("password");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Show");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("text");
    expect(button.text()).toBe("Hide");

    await button.trigger("click");
    expect(input.attributes("type")).toBe("password");
    expect(button.text()).toBe("Show");
  });

  it("applies required attribute when prop is true", () => {
    /**
     * Test 4:
     * - prop 'required' = true
     */
    const wrapper = mount(EditField, {
      props: {
        required: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("required")).toBeDefined();
  });

  it("updates internal value when modelValue prop changes", async () => {
    /**
     * Test 5
     */
    const wrapper = mount(EditField, {
      props: {
        modelValue: "initial",
      },
    });

    expect(wrapper.find("input").element.value).toBe("initial");

    await wrapper.setProps({ modelValue: "updated" });
    expect(wrapper.find("input").element.value).toBe("updated");
  });

  it("handles number input correctly", async () => {
    /**
     * Test 5:
     * - Input type = number updated yo v-model
     * - result always string
     */
    let modelValue: number | string = 0;
    const wrapper = mount(EditField, {
      props: {
        type: "number",
        modelValue,
        "onUpdate:modelValue": (val: number) => (modelValue = val),
      },
    });

    const input = wrapper.find("input");
    await input.setValue("42");
    expect(modelValue).toBe(42);
  });
});
