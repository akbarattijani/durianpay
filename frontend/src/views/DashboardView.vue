<template>
    <div class="dashboard">
  
      <!-- <div class="top-controls">
        <EditField
          v-model="search"
          placeholder="Search by ID or Name"
          @input="debounceSearch"
        />
  
        <select v-model="status" @change="fetchPayments">
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="failed">Failed</option>
        </select>
  
        <select v-model="sort" @change="fetchPayments">
          <option value="amount_asc">Amount ASC</option>
          <option value="amount_desc">Amount DESC</option>
          <option value="id_asc">ID ASC</option>
          <option value="id_desc">ID DESC</option>
        </select>
      </div> -->
  
      <ListView
        :items="viewModel.payments"
        :role="viewModel.role"
        @review="handleReview"
      />
  
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Prev</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage">Next</button>
      </div> -->
    </div>
  </template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import { useRouter } from "vue-router";
    import checkAuthentication from "../view-models/DashboardViewModel";
    import { useDasboardViewModel } from "../view-models/DashboardViewModel";
    import ListView from "../components/ListView.vue";
import { Payment } from "../models/Payment";

    const viewModel = useDasboardViewModel();

    viewModel.page = 1;
    viewModel.sort = null;
    viewModel.status = null;

    onMounted(() => {
        if (!checkAuthentication) {
            const router = useRouter();
            router.push("/login");
        } else {
            viewModel.handleListPayment();
        }
    });

    const handleReview = (item: Payment) => {
        viewModel.handlePaymentReview(item)
    };
</script>
  
<style scoped>
    .dashboard {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        margin: 0 !important;
        padding: 0 !important;
    }
  
    .top-controls {
        display: flex;
        gap: 12px;
    }
  
    .pagination {
        display: flex;
        gap: 20px;
        margin-top: 10px;
    }
</style>
  