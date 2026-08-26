<template>
  <div class="product-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm
              hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
       @click="goToProduct">

    <div class="relative overflow-hidden bg-linear-to-br from-pink-50 to-violet-50 dark:from-gray-800 dark:to-gray-800" style="aspect-ratio:1">
      <img :src="product.thumbnail" :alt="product.title"
           class="product-img w-full h-full object-cover transition-transform duration-500" loading="lazy"/>
      <div v-if="product.discountPercentage > 5"
           class="absolute top-2 left-2 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
        -{{ Math.round(product.discountPercentage) }}%
      </div>

      <button @click.stop="toggleWishlist"
              :class="['absolute top-2 right-2 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95',
                isWishlisted ? 'bg-pink-500' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm']"
              style="display:flex;align-items:center;justify-content:center">
        <svg class="w-4 h-4 transition-all"
             :class="isWishlisted ? 'fill-white stroke-white' : 'stroke-gray-400 fill-none'"
             viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>

      <div class="quick-add absolute bottom-0 left-0 right-0 p-2">
        <button @click.stop="addToCart"
                class="w-full bg-linear-to-r from-pink-500 to-violet-500 text-white text-xs font-bold py-2 rounded-xl
                       hover:from-pink-600 hover:to-violet-600 active:scale-95 transition-all shadow-lg shadow-pink-500/30">
          + Add to Cart
        </button>
      </div>
    </div>

    <div class="p-2.5 sm:p-3">
      <p class="text-xs text-pink-500 font-semibold capitalize mb-0.5 truncate">{{ product.brand || product.category }}</p>
      <h3 class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1.5 leading-snug">{{ product.title }}</h3>
      <div class="flex items-center gap-1 mb-2">
        <div class="flex gap-px">
          <span v-for="i in 5" :key="i" class="text-xs leading-none"
                :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'">★</span>
        </div>
        <span class="text-xs text-gray-400">({{ product.rating.toFixed(1) }})</span>
      </div>

      <!-- price -->
      <div class="price-block">
        <span class="price-current">LKR {{ formatPrice(product.price) }}</span>
        <div v-if="product.discountPercentage > 5" class="flex items-center gap-1.5">
          <span class="price-original">LKR {{ formatPrice(originalPrice) }}</span>
          <span class="price-badge">Save {{ Math.round(product.discountPercentage) }}%</span>
        </div>
      </div>

      <div class="mt-1.5 flex items-center gap-1.5">
        <div :class="['w-1.5 h-1.5 rounded-full shrink-0',
          product.stock>10?'bg-green-400':product.stock>0?'bg-amber-400':'bg-red-400']"></div>
        <span class="text-xs text-gray-400">
          {{ product.stock>10?'In Stock':product.stock>0?`Only ${product.stock} left`:'Out of Stock' }}
        </span>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="absolute inset-0 bg-black/5 flex items-center justify-center rounded-2xl pointer-events-none">
        <div class="bg-white dark:bg-gray-800 shadow-xl rounded-xl px-4 py-2 text-sm font-bold text-green-600 flex items-center gap-2 border border-green-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>Added!
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/Product'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useAuthStore } from '../stores/auth'

const props = defineProps<{ product: Product }>()
const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const showToast = ref(false)
const isWishlisted = computed(() => wishlistStore.isWishlisted(props.product.id))
const originalPrice = computed(() => props.product.price / (1 - props.product.discountPercentage / 100))

function formatPrice(p: number) { return (p * 200).toLocaleString('en-LK', { maximumFractionDigits: 2 }) }
function goToProduct() { router.push(`/product/${props.product.id}`) }
function goToLogin() {
  router.push({ name: 'login', query: { redirect: route.fullPath } })
}

function toggleWishlist() {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  wishlistStore.toggle(props.product)
}

function addToCart() {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  cartStore.addItem(props.product); showToast.value = true
  setTimeout(() => { showToast.value = false }, 1300)
}
</script>

<style scoped>
.product-card:hover .product-img { transform:scale(1.08); }
.product-card:hover .quick-add   { opacity:1;transform:translateY(0); }
.quick-add { opacity:0;transform:translateY(12px);transition:all .28s cubic-bezier(.34,1.56,.64,1); }
.toast-enter-active,.toast-leave-active { transition:all .22s ease; }
.toast-enter-from,.toast-leave-to { opacity:0;transform:scale(.88); }
.line-clamp-2 { display:-webkit-box;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
</style>
