<template>
  <div class="min-h-screen pt-12 pb-24 relative overflow-hidden wishlist-premium">
    
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,180,254,0.55),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(244,114,182,0.34),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(192,132,252,0.42),transparent_36%),linear-gradient(135deg,#fbf7ff_0%,#f3e8ff_45%,#ffe4f1_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(168,85,247,0.28),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(126,34,206,0.28),transparent_36%),linear-gradient(135deg,#0b0712_0%,#171022_48%,#241136_100%)]"></div>
    <div class="absolute inset-0 bg-white/35 dark:bg-white/4 backdrop-blur-2xl"></div>
    <div class="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-purple-300/35 dark:bg-purple-500/15 blur-3xl"></div>
    <div class="absolute top-20 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/30 dark:bg-fuchsia-500/12 blur-3xl"></div>
    <div class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-300/30 dark:bg-violet-500/12 blur-3xl"></div>
    <div class="absolute inset-0 premium-grid opacity-60 dark:opacity-25"></div>

    <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        class="mb-8 rounded-2xl border border-purple-200/70 dark:border-purple-200/10 bg-white/65 dark:bg-purple-100/6 shadow-[0_24px_80px_rgba(126,34,206,0.18)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl px-5 sm:px-7 py-5 animate-fade-up"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-purple-200/80 dark:border-purple-300/20 bg-purple-50/80 dark:bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-200 mb-3">
              <span class="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
              Saved Collection
            </div>

            <h1 class="text-3xl sm:text-4xl font-display font-bold text-gray-950 dark:text-white tracking-tight">
              Wishlist
            </h1>

            <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {{ wishlistStore.total }} saved items ready for you
            </p>
          </div>

          <button
            v-if="wishlistStore.total"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-semibold text-sm shadow-lg shadow-purple-500/20 dark:shadow-purple-950/40 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Add All to Cart
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="wishlistStore.total === 0"
        class="mx-auto max-w-xl text-center rounded-3xl border border-purple-200/70 dark:border-purple-200/10 bg-white/70 dark:bg-purple-100/6 shadow-[0_24px_80px_rgba(126,34,206,0.18)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl px-6 py-20 animate-scale-in"
      >
        <div class="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-fuchsia-100 dark:from-purple-400/20 dark:to-fuchsia-400/20 ring-1 ring-purple-200/80 dark:ring-white/10 shadow-inner">
          <span class="text-5xl animate-float">💝</span>
        </div>

        <h2 class="text-2xl font-display font-bold text-gray-950 dark:text-white mb-2">
          Your wishlist is empty
        </h2>

        <p class="text-gray-600 dark:text-gray-300 mb-7 text-sm">
          Save your favorite products and they will appear here.
        </p>

        <RouterLink to="/products" class="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-full font-bold hover:shadow-lg transition-all">
          Explore Products →
        </RouterLink>
      </div>

      <!-- Products -->
      <div
        v-else
        class="rounded-2xl border border-purple-200/60 dark:border-purple-200/10 bg-white/45 dark:bg-purple-100/4 shadow-[0_22px_80px_rgba(126,34,206,0.14)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl p-4 sm:p-5"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="(p, i) in wishlistStore.items"
            :key="p.id"
            class="reveal-scale show product-shell"
            :style="{ transitionDelay: (i % 8 * 50) + 'ms' }"
          >
            <ProductCard :product="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useWishlistStore } from '../stores/wishlist'

const wishlistStore = useWishlistStore()



</script>

<style scoped>
.wishlist-premium {
  isolation: isolate;
}

.premium-grid {
  background-image:
    linear-gradient(rgba(126, 34, 206, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190, 24, 93, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.product-shell {
  border-radius: 18px;
  transition:
    transform 220ms ease,
    filter 220ms ease;
}

.product-shell:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 18px 28px rgba(126, 34, 206, 0.16));
}

@media (prefers-reduced-motion: reduce) {
  .product-shell,
  .product-shell:hover {
    transition: none;
    transform: none;
  }
}
</style>
