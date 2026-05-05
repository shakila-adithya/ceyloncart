<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

const products = ref<Product[]>([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  products.value = data.products
})
</script>

<template>
  <div>
    <h1>Products</h1>

    <div class="grid grid-cols-2 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>