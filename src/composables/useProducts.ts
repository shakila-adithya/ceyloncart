import { ref } from 'vue'
import type { Category } from '../types/Product'

const BASE = 'https://dummyjson.com'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  async function fetchCategories() {
    loading.value = true
    try {
      const res = await fetch(`${BASE}/products/categories`)
      categories.value = await res.json()
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, fetchCategories }
}
