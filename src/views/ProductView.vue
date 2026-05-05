<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Product {
  id: number
  title: string
  price: number
  description: string
  thumbnail: string
  category: string
  rating: number
  stock: number
  images: string[]
  brand?: string
  discountPercentage?: number
}

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error('Product not found')
    const data = await res.json()
    product.value = data
  } catch (err) {
    error.value = 'Failed to load product details.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <button @click="router.back()" class="mb-4 text-blue-600 hover:underline flex items-center gap-1">
      ← Back
    </button>

    <div v-if="loading" class="text-gray-500">Loading product...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else-if="product" class="space-y-4">
      <img :src="product.thumbnail" :alt="product.title" class="w-full max-w-sm rounded-xl shadow" />

      <h1 class="text-3xl font-bold">{{ product.title }}</h1>

      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span class="capitalize bg-gray-100 px-2 py-1 rounded">{{ product.category }}</span><br>
        <span v-if="product.brand">Brand: {{ product.brand }}</span><br>
        <span>⭐ {{ product.rating }}</span><br>
        <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">
          {{ product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock' }}
        </span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-3xl font-bold text-green-700">${{ product.price }}</span><br>
        <span v-if="product.discountPercentage" class="text-sm text-red-500 font-medium">
          {{ product.discountPercentage.toFixed(1) }}% OFF
        </span>
      </div>

      <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>

      <div v-if="product.images && product.images.length > 1" class="mt-4">
        <h2 class="font-semibold mb-2">More Images</h2>
        <div class="flex gap-2 flex-wrap">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            class="w-24 h-24 object-cover rounded-lg border"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-gray-400">Product not found.</div>
  </div>
</template>