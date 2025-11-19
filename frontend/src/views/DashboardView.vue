<template>
    <div class="dashboard">
     <div class="top-controls">
        <div class="top-bar">
            <div class="logo">
                <img src="../assets/logo_durianpay.png" alt="logo" />
            </div>
            <button class="logout-btn" @click="handleLogout">Logout</button>
        </div>
        <EditField
            v-model="viewModel.search"
            placeholder="Search by ID or Name"
            type="text"
        />
        <div class="controls">
            <div class="status-controls">
                <label>Status</label>
                <div class="radio-group">
                    <label><input type="radio" value="" v-model="viewModel.status" @change="fetchPayments" /> All</label>
                    <label><input type="radio" value="completed" v-model="viewModel.status" @change="fetchPayments" /> Completed</label>
                    <label><input type="radio" value="processing" v-model="viewModel.status" @change="fetchPayments" /> Processing</label>
                    <label><input type="radio" value="failed" v-model="viewModel.status" @change="fetchPayments" /> Failed</label>
                </div>
            </div>

            <div class="pagination-controls">
                <label>Page</label>
                <div class="pagination">
                <template v-for="page in viewModel.totalPagesArray" :key="page">
                    <button
                    :class="{ active: viewModel.page === page }"
                    @click="viewModel.goToPage(page)"
                    >
                    {{ page }}
                    </button>
                </template>
            </div>
            </div>
    
            <div class="sort-controls">
                <label>Sorting</label>
                <div class="radio-group">
                    <label><input type="radio" value="amount_asc" v-model="viewModel.sort" @change="fetchPayments" /> Amount ASC</label>
                    <label><input type="radio" value="amount_desc" v-model="viewModel.sort" @change="fetchPayments" /> Amount DESC</label>
                    <label><input type="radio" value="id_asc" v-model="viewModel.sort" @change="fetchPayments" /> ID ASC</label>
                    <label><input type="radio" value="id_desc" v-model="viewModel.sort" @change="fetchPayments" /> ID DESC</label>
                </div>
            </div>
        </div>
      </div>
  
      <div class="listview">
        <template v-if="viewModel.loading">
            <div class="loading-placeholder">
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
                <div class="shimmer"></div>
            </div>
        </template>
        <template v-else>
            <ListView
                :items="viewModel.filteredPayments"
                :role="viewModel.role"
                @review="handleReview"
            />
        </template>
      </div>
    </div>
  </template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { checkAuthentication, getRole } from "../view-models/DashboardViewModel";
    import { useDasboardViewModel } from "../view-models/DashboardViewModel";
    import ListView from "../components/ListView.vue";
    import EditField from "../components/EditField.vue";
    import { Payment } from "../models/Payment";

    const viewModel = useDasboardViewModel();
    const router = useRouter();

    viewModel.page = viewModel.page || 1;
    viewModel.sort = null;
    viewModel.status = null;
    viewModel.role = getRole();

    onMounted(() => {
        if (!checkAuthentication()) {
            router.push("/login");
        } else {
            viewModel.handleListPayment();
            viewModel.fetchTotalCount();
        }
    });

    const handleReview = (item: Payment) => {
        viewModel.handlePaymentReview(item)
    };

    const fetchPayments = () => {
        viewModel.page = 1;
        viewModel.handleListPayment();
        viewModel.fetchTotalCount();
    };

    const handleLogout = () => {
        viewModel.logout()
        router.push("/login");
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
        flex-direction: column;
        background: white;
        margin: 0 !important;
        padding: 0 !important;
    }
  
    .top-controls {
        flex: 0 0 auto; /* tidak mengembang */
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        align-items: flex-start;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }
  
    .pagination {
        display: flex;
        gap: 8px;
        margin-top: 10px;
    }

    .pagination button {
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
        font-size: 14px;
    }

    .pagination button.active {
        background: #7b4df3;
        color: white;
        border-color: #7b4df3;
    }

    .pagination button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .logo {
        gap: 8px;
        font-weight: bold;
        font-size: 20px;
    }

    .logo img {
        height: auto;
        width: clamp(80px, 10vw, 140px);
    }

    .listview {
        flex: 1 1 auto;          /* ambil sisa height di bawah top-controls */
        overflow-y: auto;        /* scroll vertikal jika konten tinggi */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 80vw;
        margin: 0 auto;
    }

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 12px;
    }

    .radio-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .radio-group label {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        cursor: pointer;
    }

    .status-controls {
        display: flex;
        flex-direction: column;
    }

    .pagination-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sort-controls {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 14px;
        font-weight: bold;
        display: block;
        margin-bottom: 6px;
        color: #555;
    }

    .loading-placeholder {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 80%;
    }

    .shimmer {
        height: 100px;
        background: #f0f0f0;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
    }

    /* shimmer animation */
    .shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -150px;
        width: 150px;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 1.2s infinite;
    }

    @keyframes shimmer {
        0% { left: -150px; }
        100% { left: 100%; }
    }

    .top-bar {
        display: flex;
        justify-content: space-between; /* logo kiri, logout kanan */
        align-items: center;
        width: 100%;
    }

    .logout-btn {
        padding: 6px 12px;
        font-size: 14px;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .logout-btn:hover {
        background-color: #c0392b;
    }
</style>
  