import { ref } from 'vue'
import type { Product, ProductsResponse, Category } from '../types/Product'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  async function fetchProducts(limit = 30, skip = 0, category?: string, search?: string) {
    loading.value = true
    error.value = null
    try {
      let url: string

      if (search) {
        url = `${BASE}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        const res = await fetch(url)
        const data: ProductsResponse = await res.json()
        products.value = data.products
        total.value = data.total
      } else if (category) {
        url = `${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
        const res = await fetch(url)
        const data: ProductsResponse = await res.json()
        products.value = data.products
        total.value = data.total
      } else {

        const allRes = await fetch(`${BASE}/products?limit=0`)
        const allData: ProductsResponse = await allRes.json()
        const all = allData.products

        const expanded: Product[] = []
        for (let pass = 0; pass < 3; pass++) {
          all.forEach(p => {
            expanded.push({
              ...p,
              id: p.id + pass * 10000,
              price: pass === 0 ? p.price : parseFloat((p.price * (0.85 + pass * 0.15)).toFixed(2)),
              discountPercentage: pass === 0 ? p.discountPercentage : parseFloat((p.discountPercentage * (0.9 + pass * 0.1)).toFixed(1)),
              title: pass === 0 ? p.title : `${p.title}${pass === 1 ? ' — Special' : ' — Premium'}`,
            })
          })
        }

        total.value = expanded.length 
        products.value = expanded.slice(skip, skip + limit)
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, total, fetchProducts }
}

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

export function useProduct() {
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProduct(id: number) {
    loading.value = true
    error.value = null
    try {
      const realId = id > 20000 ? id - 20000 : id > 10000 ? id - 10000 : id
      const res = await fetch(`${BASE}/products/${realId}`)
      const data = await res.json()

      if (id > 20000) {
        data.price = parseFloat((data.price * 0.85).toFixed(2))
        data.title = `${data.title} — Premium`
      } else if (id > 10000) {
        data.price = parseFloat((data.price * 1.0).toFixed(2))
        data.title = `${data.title} — Special`
      }
      product.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { product, loading, error, fetchProduct }
}