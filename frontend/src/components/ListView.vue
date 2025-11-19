<template>
  <div class="list-container">
    <template v-for="item in items" :key="item?.id">
      <div
        v-if="item"
        class="branch-card"
        :class="{ disabled: item.status !== 'Live' }"
      >
        <div class="left-section">
          <div class="name-card">
            {{ item.name }}  
            <div class="label">
              {{ "(ID : " + item.id + ")" }}
            </div>
          </div>
          <div class="amount">IDR {{ formatAmount(item.amount) }}</div>
          <span class="created">Created: {{ formatDate(item.created_at) }}</span>
        </div>

        <div class="right-section">
          <span class="status" :class="item.status.toLowerCase()">
              {{ item.status.toUpperCase() }}
          </span>
          
          <div v-if="item.reviewed" class="reviewed">
            Reviewed
          </div>

          <button 
            v-else-if="role === 'operation'"
            class="button"
            :disabled="item.loading"
            @click="emit('review', item)"
          >
            {{ item.loading ? 'Loading...' : 'Mark as Reviewed' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { Payment } from '../models/Payment';

  defineProps<{
    items: Payment[];
    role: string;
  }>();

  const emit = defineEmits(["review"]);

  function formatAmount(value: number) {
    if (!value) return "0";
    return value.toLocaleString("id-ID");
  }

  function formatDate(date: string) {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
</script>

<style scoped>
  .list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: calc(100vh);
    overflow-y: auto;
    padding-right: 4px;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .branch-card {
      width: 100%;
      max-width: 80vw;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 16px;
      border-radius: 12px;
      background: white;
      border: 1px solid #e2e2e2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06);
  }

  .branch-card.disabled {
    opacity: 0.6;
  }

  .left-section {
    display: flex;
    flex-direction: column;
  }

  .branch-title {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status {
    display: inline-block;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 8px;
    background: #d4f8d4;
    color: #0a7d0a;
    font-weight: bold;
    width: fit-content;
  }

  .status.completed {
    background: #e0f0ff;
    color: #007bff;
  }

  .status.processing {
    background: #d4f8d4;
    color: #0a7d0a;
  }

  .status.failed {
    background: #ffe1e1;
    color: #d10000;
  }

  .right-section {
    display: flex;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
  }

  .label {
    font-size: 12px;
    color: black;
  }

  .amount {
    font-weight: bold;
    font-size: 18px;
    margin-top: 4px;
    color: black;
  }

  .reviewed {
    font-size: 12px;
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }

  .created {
    font-size: 9px;
    color: gray;
  }

  button {
    display: inline-block;
    padding: 6px 12px;
    background: #7b4df3;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 13px;
    cursor: pointer;
    margin-top: 10px;
    width: auto;
  }
  
  button:hover {
    background: #6a40d9;
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .name-card {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: bold;
    color: black;
    gap: 4px;
  }
</style>
