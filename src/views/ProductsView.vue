<template>
  <div class="min-h-screen pt-12 pb-16 page-warm">
    <div class="max-w-345 mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-6 animate-fade-up">
        <h1 class="text-3xl font-display font-bold text-gray-800 dark:text-white mb-1">All Products</h1>
        <p class="text-gray-500 text-sm">
          <span class="text-pink-500 font-bold">{{ total }}</span> products available
          <span v-if="selectedCategory"> in <em class="text-violet-500 capitalize not-italic font-semibold">{{ selectedCategory.replace(/-/g,' ') }}</em></span>
        </p>
      </div>

      <!-- TRUST BADGES BAR -->
      <div class="trust-bar mb-6 animate-fade-up" style="animation-delay:.12s">
        <div
          v-for="(badge, i) in trustBadges"
          :key="badge.title"
          class="trust-badge"
        >
          <div class="trust-icon-wrap" :class="badge.iconBg">
            <span class="text-lg leading-none">{{ badge.icon }}</span>
          </div>
          <div class="min-w-0">
            <p class="trust-title">{{ badge.title }}</p>
            <p class="trust-sub">{{ badge.sub }}</p>
          </div>
          <div v-if="i < trustBadges.length - 1" class="trust-divider"></div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap gap-3 mb-6 p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur rounded-2xl border border-pink-100/60 dark:border-gray-800 shadow-sm animate-slide-down">
        <div class="relative flex-1 min-w-44">
          <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search products…"
            class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-pink-50/80 dark:bg-gray-800 border border-pink-100 dark:border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm transition-all"/>
          <svg class="absolute left-2.5 top-3 w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <select v-model="selectedCategory" @change="applyFilters"
          class="px-4 py-2.5 rounded-xl bg-pink-50/80 dark:bg-gray-800 border border-pink-100 dark:border-gray-700
                 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 dark:text-gray-200 cursor-pointer">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
        </select>
        <select v-model="sortBy" @change="applyFilters"
          class="px-4 py-2.5 rounded-xl bg-pink-50/80 dark:bg-gray-800 border border-pink-100 dark:border-gray-700
                 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 dark:text-gray-200 cursor-pointer">
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
        <div class="flex items-center bg-pink-50/80 dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <button @click="viewMode='grid'"
            :class="['px-3 py-2.5 transition-colors', viewMode==='grid' ? 'bg-linear-to-r from-pink-500 to-violet-500 text-white' : 'text-gray-500 hover:text-pink-500']">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/></svg>
          </button>
          <button @click="viewMode='list'"
            :class="['px-3 py-2.5 transition-colors', viewMode==='list' ? 'bg-linear-to-r from-pink-500 to-violet-500 text-white' : 'text-gray-500 hover:text-pink-500']">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Active filter chips -->
      <div v-if="selectedCategory || searchQuery" class="flex gap-2 mb-5 flex-wrap">
        <span v-if="selectedCategory"
          class="flex items-center gap-1 bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-xs font-semibold px-3 py-1.5 rounded-full">
          📂 {{ selectedCategory.replace(/-/g,' ') }}
          <button @click="clearCategory" class="ml-1 text-base leading-none hover:text-pink-900">×</button>
        </span>
        <span v-if="searchQuery"
          class="flex items-center gap-1 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full">
          🔍 "{{ searchQuery }}"
          <button @click="clearSearch" class="ml-1 text-base leading-none hover:text-violet-900">×</button>
        </span>
      </div>

      <!-- Loading -->
      <div v-if="loading" :class="['grid gap-4', viewMode==='grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2']">
        <SkeletonCard v-for="i in 20" :key="i"/>
      </div>

      <!-- Empty state -->
      <div v-else-if="sorted.length === 0" class="text-center py-24">
        <div class="text-7xl mb-5 animate-float inline-block">🔍</div>
        <h3 class="text-xl font-display font-bold text-gray-700 dark:text-gray-200 mb-2">No products found</h3>
        <p class="text-gray-400 text-sm mb-5">Try a different search term or category</p>
        <button @click="clearAll"
          class="px-6 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all active:scale-95">
          Clear Filters
        </button>
      </div>

      <!-- Products grid -->
      <div v-else :class="['grid gap-4', viewMode==='grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 md:grid-cols-2']">
        <div v-for="(p, i) in sorted" :key="p.id"
          class="reveal-scale show" :style="{transitionDelay: (i % 8 * 40) + 'ms'}">
          <ProductCard :product="p"/>
        </div>
      </div>

      <!-- Pages -->
      <div v-if="total > limit && !loading" class="flex justify-center items-center gap-3 mt-12">
        <button @click="prevPage" :disabled="skip === 0"
          class="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                 text-sm font-medium disabled:opacity-40 hover:border-pink-400 hover:text-pink-500 transition-all">
          ← Prev
        </button>
        <div class="flex gap-1 items-center">
          <span class="px-4 py-2 text-sm font-bold bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-xl">{{ currentPage }}</span>
          <span class="px-2 py-2 text-sm text-gray-400">/ {{ totalPages }}</span>
        </div>
        <button @click="nextPage" :disabled="skip + limit >= total"
          class="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                 text-sm font-medium disabled:opacity-40 hover:border-pink-400 hover:text-pink-500 transition-all">
          Next →
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { useProducts, useCategories } from '../composables/useProducts'
import type { Product } from '../types/Product'

const route = useRoute()
const { products, loading, total, fetchProducts } = useProducts()
const { categories, fetchCategories } = useCategories()

const searchQuery = ref((route.query.search as string) || '')
const selectedCategory = ref('')
const sortBy = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const limit = 40
const skip = ref(0)

const currentPage = computed(() => Math.floor(skip.value / limit) + 1)
const totalPages  = computed(() => Math.ceil(total.value / limit))

const sorted = computed<Product[]>(() => {
  const list = [...products.value]
  if (sortBy.value === 'price-asc')  list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating')     list.sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'discount')   list.sort((a, b) => b.discountPercentage - a.discountPercentage)
  return list
})

let dt: ReturnType<typeof setTimeout>
function debouncedSearch() {
  clearTimeout(dt)
  dt = setTimeout(() => { skip.value = 0; loadProducts() }, 400)
}
async function applyFilters() { skip.value = 0; await loadProducts() }
async function loadProducts() {
  await fetchProducts(limit, skip.value, selectedCategory.value || undefined, searchQuery.value || undefined)
}
function clearCategory() { selectedCategory.value = ''; applyFilters() }
function clearSearch()   { searchQuery.value = '';    applyFilters() }
function clearAll()      { selectedCategory.value = ''; searchQuery.value = ''; sortBy.value = ''; applyFilters() }
function prevPage() {
  if (skip.value > 0) { skip.value -= limit; loadProducts(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
}
function nextPage() {
  if (skip.value + limit < total.value) { skip.value += limit; loadProducts(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
}

onMounted(async () => { await fetchCategories(); await loadProducts() })
watch(() => route.query.search, val => { if (val) { searchQuery.value = val as string; loadProducts() } })

//Trust Badges 
const trustBadges = [
  { icon: '🚚', iconBg: 'icon-pink',   title: 'Free Shipping',    sub: 'On orders over LKR 5,000'      },
  { icon: '🔄', iconBg: 'icon-violet', title: '30-Day Returns',   sub: 'Hassle-free, no questions asked' },
  { icon: '🔒', iconBg: 'icon-blue',   title: 'Secure Checkout',  sub: 'SSL encrypted & 100% safe'      },
  { icon: '⭐', iconBg: 'icon-amber',  title: '4.8 Star Rating',  sub: 'Trusted by 10,000+ shoppers'    },
  { icon: '🎧', iconBg: 'icon-green',  title: '24/7 Support',     sub: 'Always here when you need us'   },
]
</script>

<style scoped>
/*Trust Badges Bar*/
.trust-bar {
  display: flex;
  flex-wrap: wrap;
  background: white;
  border: 1px solid rgba(236,72,153,.12);
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0,0,0,.04),
    0 4px 20px rgba(236,72,153,.07);
}

.dark .trust-bar {
  background: rgba(17,24,39,.85);
  border-color: rgba(255,255,255,.06);
  box-shadow: 0 4px 24px rgba(0,0,0,.3);
}

.trust-badge {
  flex: 1 1 140px;
  display: flex;
  align-items: center;
  gap: .7rem;
  padding: .85rem 1.2rem;
  position: relative;
  transition: background .2s;
  cursor: default;
}

.trust-badge:hover {
  background: rgba(236,72,153,.04);
}
.dark .trust-badge:hover {
  background: rgba(255,255,255,.04);
}

.trust-divider {
  position: absolute;
  right: 0;
  top: 18%;
  height: 64%;
  width: 1px;
  background: rgba(236,72,153,.1);
}
.dark .trust-divider {
  background: rgba(255,255,255,.07);
}

/* Icon bubbles */
.trust-icon-wrap {
  flex-shrink: 0;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: .7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-pink   { background: linear-gradient(135deg,#fce7f3,#fdf4ff); }
.icon-violet { background: linear-gradient(135deg,#ede9fe,#f5f3ff); }
.icon-blue   { background: linear-gradient(135deg,#dbeafe,#eff6ff); }
.icon-amber  { background: linear-gradient(135deg,#fef3c7,#fffbeb); }
.icon-green  { background: linear-gradient(135deg,#d1fae5,#f0fdf4); }

.dark .icon-pink   { background: rgba(236,72,153,.15);  }
.dark .icon-violet { background: rgba(139,92,246,.15);  }
.dark .icon-blue   { background: rgba(59,130,246,.15);  }
.dark .icon-amber  { background: rgba(245,158,11,.15);  }
.dark .icon-green  { background: rgba(16,185,129,.15);  }

/* Text */
.trust-title {
  font-size: .73rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  white-space: nowrap;
}
.trust-sub {
  font-size: .63rem;
  color: #9ca3af;
  margin-top: .15rem;
  white-space: nowrap;
}
.dark .trust-title { color: #f3f4f6; }
.dark .trust-sub   { color: #6b7280; }

.animate-fade-up {
  animation: fadeUp .6s ease both;
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:none; }
}

.animate-slide-down {
  animation: slideDown .5s ease both;
}
@keyframes slideDown {
  from { opacity:0; transform:translateY(-10px); }
  to   { opacity:1; transform:none; }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
@keyframes float {
  0%,100% { transform:translateY(0); }
  50%     { transform:translateY(-8px); }
}

.reveal-scale {
  opacity: 0;
  transform: scale(.96) translateY(14px);
  transition: opacity .5s ease, transform .5s ease;
}
.reveal-scale.show {
  opacity: 1;
  transform: none;
}
</style>