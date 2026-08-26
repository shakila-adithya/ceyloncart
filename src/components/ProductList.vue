<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getProducts, getCategories } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard.vue";
import CategoryFilter from "./CategoryFilter.vue";

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const route = useRoute();
const searchQuery = ref("");
const selectedCategory = ref("");

function searchFromRouteQuery(q: unknown): string {
  if (q == null) return "";
  if (Array.isArray(q)) return (q[0] ?? "").toString();
  return String(q);
}

watch(
  () => route.query.search,
  (s) => {
    searchQuery.value = searchFromRouteQuery(s);
  },
  { immediate: true }
);

const filteredProducts = computed(() => {
  let result = products.value;

  if (selectedCategory.value) {
    result = result.filter((p) => p.category === selectedCategory.value);
  }

  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return result;
});

onMounted(async () => {
  loading.value = true;
  try {
    [products.value, categories.value] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    error.value = "Failed to load products.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="px-4 py-6 max-w-7xl mx-auto">

    <!-- Filter Bar -->
    <div class="mb-6 space-y-3">
      <CategoryFilter
        :categories="categories"
        v-model="selectedCategory"
      />
    </div>

    <!-- Results summary -->
    <p class="text-sm text-gray-400 mb-4" v-if="!loading">
      {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? "s" : "" }} found
      <span v-if="searchQuery"> for "<strong class="text-gray-600">{{ searchQuery }}</strong>"</span>
      <span v-if="selectedCategory"> in <strong class="text-gray-600 capitalize">{{ selectedCategory }}</strong></span>
    </p>

    <!-- States -->
    <p v-if="loading" class="text-gray-400 text-sm">Loading products…</p>
    <p v-else-if="error" class="text-red-500 text-sm">{{ error }}</p>

    <!-- Empty state -->
    <div
      v-else-if="filteredProducts.length === 0"
      class="text-center py-20 text-gray-400"
    >
      <p class="text-4xl mb-3">🔍</p>
      <p class="text-lg font-medium">No products found</p>
      <p class="text-sm mt-1">Try a different search term or category.</p>
    </div>

    <!-- Product Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

  </div>
</template>
