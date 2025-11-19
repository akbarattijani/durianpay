<template>
    <div class="login-container">
        <div class="login-box">
            <div class="logo">
                <img src="../assets/logo_durianpay.png" alt="logo" />
            </div>
            
            <h2>Masuk ke Dasbor</h2>

            <form @submit.prevent="handleSubmit">
                <EditField
                    v-model="viewModel.email"
                    label="Email"
                    placeholder="Email Anda"
                    type="text"
                    required
                />

                <EditField
                    v-model="viewModel.password"
                    label="Kata sandi"
                    placeholder="Masukkan kata sandi Anda"
                    type="password"
                    required
                />

                <p v-if="viewModel.error" class="error">{{ viewModel.error }}</p>

                <button type="submit" :disabled="viewModel.loading">
                    {{ viewModel.loading ? "Memproses..." : "Masuk" }}
                </button>
            </form>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { useLoginViewModel } from "../view-models/LoginViewModel";
    import EditField from "../components/EditField.vue";
    import { useRouter } from "vue-router";

    const viewModel = useLoginViewModel();
    const router = useRouter();

    const handleSubmit = async () => {
        const response = await viewModel.handleAuthentication();
        if (response) {
            router.push("/");
        }
    };
</script>
  
<style scoped>
    .logo {
        gap: 8px;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 40px;
    }

    .logo img {
        height: auto;
        width: clamp(80px, 10vw, 140px);
    }

    .login-container {
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
    
    .login-box {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

        /* default for mobile */
        min-width: 80vw;
    }

    /* desktop (screen resolution ≥ 1024px) */
    @media (min-width: 1024px) {
        .login-box {
            min-width: 35vw;
        }
    }
    
    .login-box h2 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 22px;
        color: #333;
        font-weight: bold;
    }
    
    button {
        width: 100%;
        padding: 10px;
        background: #7b4df3;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 15px;
        cursor: pointer;
        margin-top: 10px;
    }
    
    button:hover {
        background: #6a40d9;
    }
    
    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .error {
        color: red;
        font-size: 13px;
        margin-bottom: 8px;
    }
</style>