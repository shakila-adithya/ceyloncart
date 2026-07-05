import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginPayload } from '../types/Product'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('ceyloncart_user') || 'null'))
  const token = ref<string | null>(localStorage.getItem('ceyloncart_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, expiresInMins: 60 }),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data: User = await res.json()
      user.value = data
      token.value = data.token
      localStorage.setItem('ceyloncart_user', JSON.stringify(data))
      localStorage.setItem('ceyloncart_token', data.token)
      return true
    } catch (e: any) {
      error.value = e.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('ceyloncart_user')
    localStorage.removeItem('ceyloncart_token')
  }

  return { user, token, loading, error, isLoggedIn, login, logout }
})
