<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchProducts = async () => {
  loading.value = true;
  try {
    products.value = await getProducts();
  } catch (err) {
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div>
    <h2>Products</h2>

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>