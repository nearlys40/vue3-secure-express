import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  login as loginApi,
  logout as logoutApi,
  me as meApi,
  refresh as refreshApi,
} from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ id: string; role: string } | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function login(username: string, password: string) {
    try {
      loading.value = true
      await loginApi({ username, password })
      await getProfile()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  async function getProfile() {
    try {
      const res = await meApi()
      user.value = res.data
    } catch {
      user.value = null
    }
  }

  async function refresh() {
    try {
      await refreshApi()
      await getProfile()
    } catch {
      user.value = null
    }
  }

  async function logout() {
    await logoutApi()
    user.value = null
  }

  return { user, error, loading, login, logout, refresh, getProfile }
})
