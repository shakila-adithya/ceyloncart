<template>
  <div class="min-h-screen -mt-16 pt-20 pb-16 product-page-bg">

    <div class="absolute top-16 left-0 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl pointer-events-none z-0"></div>
    <div class="absolute top-32 right-0 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl pointer-events-none z-0"></div>

    <!-- Skeleton -->
    <div v-if="loading" class="max-w-352 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div class="skeleton rounded-3xl" style="aspect-ratio:1"></div>
        <div class="space-y-4 pt-4">
          <div class="skeleton h-5 w-1/3 rounded-xl"></div>
          <div class="skeleton h-10 w-3/4 rounded-xl"></div>
          <div class="skeleton h-4 w-1/2 rounded-xl"></div>
          <div class="skeleton h-12 w-2/3 rounded-xl"></div>
          <div class="skeleton h-20 w-full rounded-xl"></div>
          <div class="skeleton h-14 w-full rounded-full"></div>
        </div>
      </div>
    </div>

    <div v-else-if="product" class="max-w-352 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 animate-fade-up flex-wrap">
        <RouterLink to="/" class="hover:text-pink-500 transition-colors">Home</RouterLink>
        <span class="text-gray-300">/</span>
        <RouterLink to="/products" class="hover:text-pink-500 transition-colors">Products</RouterLink>
        <span class="text-gray-300">/</span>
        <RouterLink :to="`/category/${product.category}`" class="hover:text-pink-500 transition-colors capitalize">{{ product.category }}</RouterLink>
        <span class="text-gray-300">/</span>
        <span class="text-gray-600 dark:text-gray-300 truncate max-w-35 font-medium">{{ product.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-14">

        <!-- Images -->
        <div class="animate-fade-up">
          <div class="rounded-3xl overflow-hidden relative group shadow-2xl shadow-pink-500/10 mx-auto aspect-square w-110 max-w-xl" style="background:linear-gradient(135deg,#fdf2f8,#f5f0ff,#f0f9ff)">
            <img v-for="img in product.images" :key="img" :src="activeImage" :alt="product.title"
              class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"/>
            <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Wishlist button -->
            <button @click="toggleWishlist"
              :class="['absolute top-4 right-4 w-11 h-11 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95',
                isWishlisted ? 'bg-pink-500' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm']">
              <svg class="w-5 h-5"
                :class="isWishlisted ? 'fill-white stroke-white' : 'stroke-gray-400 fill-none'"
                viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            
            <!-- Discount -->
            <div v-if="product.discountPercentage > 5"
              class="absolute top-4 left-4 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
              -{{ Math.round(product.discountPercentage) }}% OFF
            </div>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-2 overflow-x-auto pb-1 mt-3 scrollbar-hide">
            <button v-for="img in product.images" :key="img" @click="activeImage = img"
              :class="['shrink-0 w-18 h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 p-0.5 bg-white dark:bg-gray-900',
                activeImage === img
                  ? 'border-pink-500 shadow-md shadow-pink-500/30 ring-2 ring-pink-200 dark:ring-pink-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 opacity-65 hover:opacity-100']">
              <img :src="img" class="w-full h-full object-contain rounded-lg"/>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="animate-fade-up pt-1" style="animation-delay:.12s">

          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="text-xs font-black text-pink-500 uppercase tracking-widest bg-pink-50 dark:bg-pink-950/50 px-3 py-1 rounded-full">{{ product.brand }}</span>
            <span class="text-xs text-gray-400 capitalize bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{{ product.category }}</span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">{{ product.title }}</h1>

          <!-- Rating -->
          <div class="flex flex-wrap items-center gap-3 mb-5">
            <div class="flex gap-0.5">
              <span v-for="i in 5" :key="i" class="text-lg leading-none"
                :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'">★</span>
            </div>
            <span class="text-sm font-bold text-gray-700 dark:text-gray-200">{{ product.rating.toFixed(1) }}</span>
            <span class="text-sm text-gray-400">({{ product.reviews?.length || 0 }} reviews)</span>
          </div>

          <!-- PRICE -->
          <div class="mb-6 p-4 rounded-2xl" style="background:linear-gradient(135deg,rgba(236,72,153,.06),rgba(139,92,246,.06));border:1px solid rgba(236,72,153,.12)">
            <!-- Main price row -->
            <div class="flex items-baseline gap-3 flex-wrap">
              <span class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-none">
                LKR {{ formatPrice(product.price) }}
              </span>
              <span v-if="product.discountPercentage > 2"
                class="text-lg text-gray-400 dark:text-gray-500 line-through leading-none font-medium">
                LKR {{ formatPrice(originalPrice) }}
              </span>
            </div>
            <!-- Savings -->
            <div v-if="product.discountPercentage > 2" class="flex items-center gap-2 mt-2">
              <span class="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                Save {{ Math.round(product.discountPercentage) }}%
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                You save LKR {{ formatPrice(originalPrice - product.price) }}
              </span>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span v-if="product.availabilityStatus"
              :class="['text-xs font-bold px-3 py-1.5 rounded-full',
                product.availabilityStatus === 'In Stock'
                  ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300']">
              {{ product.availabilityStatus === 'In Stock' ? '✅' : '⚠️' }} {{ product.availabilityStatus }}
            </span>
            <span v-for="tag in product.tags?.slice(0,4)" :key="tag"
              class="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 capitalize border border-gray-100 dark:border-gray-700">
              {{ tag }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">{{ product.description }}</p>

          <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 gap-1">
              <button @click="qty > 1 && qty--"
                class="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors font-bold text-pink-500 text-xl">−</button>
              <span class="w-9 text-center font-bold text-base">{{ qty }}</span>
              <button @click="qty++"
                class="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors font-bold text-pink-500 text-xl">+</button>
            </div>
            <button @click="addToCart"
              class="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-pink-500 to-violet-500 text-white
                     font-bold rounded-2xl hover:from-pink-600 hover:to-violet-600 hover:shadow-xl hover:shadow-pink-500/30
                     active:scale-95 transition-all text-base">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              Add to Cart
            </button>
          </div>

          <!-- Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div v-for="info in productInfo" :key="info.label"
              class="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span class="text-xl">{{ info.icon }}</span>
              <div>
                <p class="text-gray-400 text-xs">{{ info.label }}</p>
                <p class="font-semibold text-gray-700 dark:text-gray-200 text-xs">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Banner-->
      <div class="rounded-3xl p-7 flex flex-col md:flex-row items-center gap-5 mb-14 relative overflow-hidden"
        style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#0f172a 100%)">
        <div class="absolute inset-0 opacity-10"
          style="background-image:repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,.4) 29px,rgba(255,255,255,.4) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,.4) 29px,rgba(255,255,255,.4) 30px)"></div>
        <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>
        <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-yellow-400/30 to-orange-400/30 border border-yellow-400/30 flex items-center justify-center text-3xl animate-float relative z-10 shrink-0">📢</div>
        <div class="flex-1 text-center md:text-left relative z-10">
          <p class="text-yellow-400/80 text-xs font-black tracking-widest mb-1 uppercase">Promoted Partner</p>
          <h3 class="text-white text-xl font-display font-bold">SELLS WITH <span class="bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">CeylonCart</span></h3>
          <p class="text-gray-400 text-sm mt-1">Reach millions of shoppers across Sri Lanka. Grow your business today.</p>
        </div>
        <button class="w-full md:w-auto shrink-0 px-6 py-3 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl text-sm hover:shadow-xl active:scale-95 transition-all whitespace-nowrap relative z-10">
          Learn More →
        </button>
      </div>

      <!--Reviews-->
      <div v-if="product.reviews?.length" class="mb-14">
        <h2 class="text-2xl font-display font-bold text-gray-800 dark:text-white mb-6">Customer Reviews</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="review in product.reviews" :key="review.reviewerEmail"
            class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-gray-100/50 dark:border-gray-800/50 reveal show">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-linear-to-br from-pink-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {{ review.reviewerName[0] }}
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-700 dark:text-gray-200">{{ review.reviewerName }}</p>
                  <p class="text-xs text-gray-400">{{ new Date(review.date).toLocaleDateString('en-LK', {year:'numeric',month:'short',day:'numeric'}) }}</p>
                </div>
              </div>
              <div class="flex gap-0.5">
                <span v-for="i in 5" :key="i" class="text-sm" :class="i <= review.rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'">★</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="related.length">
        <h2 class="text-2xl font-display font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">You May Also Like <span class="text-sm font-semibold text-pink-500 bg-pink-50 dark:bg-pink-950/50 px-3 py-1 rounded-full">Related</span></h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div v-for="(p, i) in related" :key="p.id"
            class="reveal-scale show" :style="{transitionDelay:(i*70)+'ms'}">
            <ProductCard :product="p"/>
          </div>
        </div>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast"
        class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 z-50 border border-green-100 dark:border-green-900">
        <div class="w-9 h-9 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-bold text-gray-800 dark:text-gray-100">Added to cart!</p>
          <RouterLink to="/cart" class="text-xs text-pink-500 hover:underline font-medium">View Cart →</RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProduct, useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const { product, loading, fetchProduct } = useProduct()
const { products: related, fetchProducts: fetchRelated } = useProducts()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const activeImage = ref('')
const qty = ref(1)
const showToast = ref(false)

const isWishlisted = computed(() => product.value ? wishlistStore.isWishlisted(product.value.id) : false)
const originalPrice = computed(() =>
  product.value ? product.value.price / (1 - product.value.discountPercentage / 100) : 0
)
const productInfo = computed(() => product.value ? [
  { icon: '🚚', label: 'Shipping',  value: product.value.shippingInformation || 'Fast delivery' },
  { icon: '🔒', label: 'Warranty',  value: product.value.warrantyInformation || '1 year' },
  { icon: '🔄', label: 'Returns',   value: product.value.returnPolicy || '30 days' },
  { icon: '📦', label: 'Stock',     value: `${product.value.stock} available` },
] : [])

function formatPrice(p: number) {
  return (p * 200).toLocaleString('en-LK', { maximumFractionDigits: 2 })
}
function goToLogin() {
  router.push({ name: 'login', query: { redirect: route.fullPath } })
}

function toggleWishlist() {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  if (product.value) wishlistStore.toggle(product.value)
}
function addToCart() {
  if (!authStore.isLoggedIn) {
    goToLogin()
    return
  }
  if (product.value) {
    cartStore.addItem(product.value, qty.value)
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 3000)
  }
}
async function load(id: number) {
  await fetchProduct(id)
  if (product.value) {
    activeImage.value = product.value.images[0]
    await fetchRelated(8, 0, product.value.category)
  }
}
onMounted(() => load(Number(route.params.id)))
watch(() => route.params.id, id => { qty.value = 1; load(Number(id)) })
</script>

<style scoped>
.product-img-container {
  max-width: 420px;
  height: 360px;
  background: linear-gradient(135deg,#fdf2f8,#f5f0ff,#f0f9ff);
}
@media (max-width: 767px) {
  .product-img-container { max-width: 100%; height: 280px; }
}
:global(.dark) .product-img-container {
  background: linear-gradient(135deg,#1a0d1a,#0d0a20,#05090f) !important;
}

.product-page-bg {
  position: relative;
  background:
    radial-gradient(ellipse 80% 50% at 10% 10%,  rgba(236,72,153,.08)  0%, transparent 60%),
    radial-gradient(ellipse 70% 60% at 90% 20%,  rgba(139,92,246,.09)  0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 50% 80%,  rgba(59,130,246,.06)  0%, transparent 60%),
    radial-gradient(ellipse 90% 70% at 20% 90%,  rgba(236,72,153,.05)  0%, transparent 60%),
    linear-gradient(160deg, #fff8fc 0%, #f9f5ff 35%, #f0f9ff 65%, #fff5f9 100%);
}
.dark .product-page-bg {
  background:
    radial-gradient(ellipse 80% 50% at 10% 10%,  rgba(236,72,153,.06)  0%, transparent 60%),
    radial-gradient(ellipse 70% 60% at 90% 20%,  rgba(139,92,246,.07)  0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 50% 80%,  rgba(59,130,246,.04)  0%, transparent 60%),
    linear-gradient(160deg, #100610 0%, #0a0618 35%, #050e1a 65%, #0f0610 100%) !important;
}
.toast-enter-active,.toast-leave-active { transition:all .3s ease; }
.toast-enter-from,.toast-leave-to { opacity:0;transform:translateX(20px); }
</style>
