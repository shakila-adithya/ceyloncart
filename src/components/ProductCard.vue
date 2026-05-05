<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    thumbnail: string
  }
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div @click="goToDetail" class="cursor-pointer border p-4">
    <img :src="product.thumbnail" />
    <h2>{{ product.title }}</h2>
    <p>${{ product.price }}</p>
  </div>
</template>