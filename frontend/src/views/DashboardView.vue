<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4"
  >
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-2">Dashboard</h1>
      <p class="text-gray-600 text-sm mb-1">Welcome back 👋</p>
      <div class="mt-4 space-y-1">
        <p class="text-sm text-gray-700">
          <span class="font-medium">Role:</span> {{ auth.user?.role }}
        </p>
        <p class="text-sm text-gray-700">
          <span class="font-medium">User ID:</span> {{ auth.user?.id }}
        </p>
      </div>
      <button @click="logout" class="mt-6 btn btn-danger w-full">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
