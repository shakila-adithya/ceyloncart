<script setup lang="ts">
defineProps<{
  product: {
    id: number
    title: string
    price: number
    thumbnail: string
  }
}>()
</script>

<template>
  <div class="border p-4">
    <img :src="product.thumbnail" />
    <h2>{{ product.title }}</h2>
    <p>${{ product.price }}</p>
  </div>
</template>