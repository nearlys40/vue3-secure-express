<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4"
  >
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-gray-800">Create Account ✨</h1>
        <p class="text-gray-500 text-sm mt-1">Fill the form below to get started</p>
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
            placeholder="Create a password"
          />
        </div>
        <button class="btn btn-success w-full">Register</button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
      <div class="text-sm text-center text-gray-500 mt-6">
        Already have an account?
        <router-link to="/login" class="text-blue-600 font-medium hover:underline"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const submit = async () => {
  try {
    await register({ username: username.value, password: password.value })
    router.push('/login')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Register failed'
  }
}
</script>
