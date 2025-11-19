<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="input-wrapper">
      <input
        :type="currentType"
        :placeholder="placeholder"
        v-model="internalValue"
        @input="updateValue"
        :required="required"
        class="input-field"
      />
  
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-btn"
        @click="togglePassword"
      >
        {{ currentType === 'password' ? 'Show' : 'Hide' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from "vue";

  const props = defineProps({
    modelValue: { type: [String, Number], default: "" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "text" }, // 'text', 'password', 'number'
    required: { type: Boolean, default: false },
  });

  const emit = defineEmits(["update:modelValue"]);
  const internalValue = ref(props.modelValue);
  watch(
    () => props.modelValue,
    (newVal) => {
      internalValue.value = newVal;
    }
  );

  const updateValue = () => {
    emit("update:modelValue", internalValue.value);
  };

  // Show/hide password
  const showPassword = ref(false);
  const currentType = computed(() =>
    props.type === "password" ? (showPassword.value ? "text" : "password") : props.type
  );

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
</script>

<style scoped>
  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-size: 14px;
    display: block;
    margin-bottom: 6px;
    color: #555;
  }

  .input-wrapper {
    position: relative;
  }

  .input-field {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }

  .input-field:focus {
    border-color: #7b4df3;
    outline: none;
  }

  .toggle-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #7b4df3;
    font-size: 12px;
    cursor: pointer;
    padding: 2px 4px;
  }
</style>
