<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4"
  >
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back 👋</h1>
        <p class="text-gray-500 text-sm mt-1">Please login to your account</p>
      </div>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <input id="username" v-model="username" class="input" placeholder="Enter your username" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="input"
            placeholder="Enter your password"
          />
        </div>
        <button class="btn btn-primary w-full">Login</button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
      <div class="text-sm text-center text-gray-500 mt-6">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 font-medium hover:underline"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const error = ref('')

const submit = async () => {
  await auth.login(username.value, password.value)
  if (auth.user) router.push('/dashboard')
  else error.value = auth.error || 'Login failed'
}
</script>
