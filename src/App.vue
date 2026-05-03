<script setup lang="ts">
import { onMounted } from "vue";
import { getProducts } from "./services/api";

onMounted(async () => {
  const products = await getProducts();
  console.log(products);
});
</script>

<template>
  <RouterView />
</template>