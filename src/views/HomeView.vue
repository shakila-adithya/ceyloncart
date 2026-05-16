<script setup lang="ts">
import { RouterLink } from 'vue-router'

const heroStats = [
  { icon: '🛍️', value: '582+ Products', label: 'Wide Selection' },
  { icon: '🚚', value: 'Free Shipping', label: 'LKR 5000+' },
  { icon: '⭐', value: '4.8 Rating', label: 'Customer Score' },
  { icon: '🔄', value: '30-Day', label: 'Easy Returns' },
]

const marqueeItems = [
  '✨ New Arrivals','🔥 Hot Deals','💎 Premium Quality','🚀 Fast Delivery',
  '🎁 Gift Cards','💳 Secure Payments','🌟 Top Brands','🛍️ 582+ Products',
  '🇱🇰 Made for Sri Lanka','🏷️ Best Prices','📦 Free Shipping',
]
</script>

<template>
<div>

    <!-- HERO SECTION -->
    <section class="hero-bg hero-section min-h-screen flex items-center relative overflow-hidden pt-0">

      <!-- Animated blobs -->
      <div class="absolute top-20 left-6 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute bottom-20 right-6 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-blob" style="animation-delay:3s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-blob" style="animation-delay:6s"></div>

      <!-- Rotating ring decorations -->
      <div class="absolute top-24 right-16 w-32 h-32 border border-pink-300/20 rounded-full animate-spin-slow hidden md:block"></div>
      <div class="absolute bottom-24 left-16 w-20 h-20 border border-violet-300/30 rounded-full animate-spin-slow hidden md:block" style="animation-direction:reverse;animation-duration:8s"></div>

      <!-- Floating dots grid -->
      <div class="absolute inset-0 pointer-events-none" style="background-image:radial-gradient(rgba(236,72,153,.12) 1px,transparent 1px);background-size:40px 40px"></div>

      <div class="hero-inner w-full max-w-[1418px] mx-auto px-6 sm:px-8 lg:px-10 py-12 grid md:grid-cols-2 gap-14 items-center relative z-10">

        <!-- Left text -->
        <div class="hero-copy">
          <!-- Pill badge -->
          <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-semibold text-pink-600 dark:text-pink-600 mb-7 animate-fade-up stagger-1">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-600 opacity-100"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            Sri Lanka's Premium Marketplace
          </div>

          <!-- Headline with shimmer -->
          <h1 class="hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up stagger-2">
            Shop
            <span class="shimmer-text"> Smarter,</span><br/>
            Live
            <span class="bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent"> Better</span>
          </h1>

          <p class="hero-subtitle text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed animate-fade-up stagger-3 max-w-lg">
            Discover thousands of premium products at unbeatable prices — carefully curated just for you.
          </p>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-4 animate-fade-up stagger-4">
            <RouterLink to="/products" class="hero-btn-primary group" justify-center>
              <span>Shop Now</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </RouterLink>
            <RouterLink to="/products" class="hero-btn-outline">Browse Categories</RouterLink>
          </div>

          <!-- Trust badges with count-up animation -->
          <div class="hero-stats flex flex-wrap gap-5 mt-10 animate-fade-up stagger-5">
            <div v-for="(stat, i) in heroStats" :key="stat.label"
              class="hero-stat-card flex items-center gap-2 group"
              :style="{animationDelay: (i * 0.15) + 's'}">
              <div class="hero-stat-icon w-8 h-8 rounded-lg bg-linear-to-br from-pink-500/10 to-violet-500/10 border border-pink-200/50 dark:border-pink-800/30 flex items-center justify-center text-sm">
                {{ stat.icon }}
              </div>
              <div>
                <p class="hero-stat-value text-xs font-bold text-gray-800 dark:text-gray-100">{{ stat.value }}</p>
                <p class="hero-stat-label text-xs text-gray-400">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right — image grid with advanced hover effects -->
        <div class="hidden md:block relative animate-fade-up stagger-3 hero-img-col">
          <!-- Main big image with tilt -->
          <div class="animate-tilt rounded-3xl shadow-2xl shadow-pink-500/20 mb-4 relative group hero-img-wrap">
            <div class="rounded-3xl overflow-hidden w-full h-52" style="transform:translateZ(0);will-change:transform">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&h=300&fit=crop&auto=format&q=80"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            </div>
            <div class="absolute inset-0 rounded-3xl bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              🛍️ New Arrivals
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-2xl overflow-hidden shadow-xl group relative animate-float h-36">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format&q=80"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-linear-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="rounded-2xl overflow-hidden shadow-xl group relative h-36" style="animation:floatSlow 6s ease-in-out 1s infinite">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=200&fit=crop&auto=format&q=80"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div class="absolute inset-0 bg-linear-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <!-- Floating badge -->
          <div class="absolute -top-4 -left-4 bg-linear-to-r from-pink-500 to-violet-500 text-white text-xs font-black px-4 py-2 rounded-2xl shadow-xl animate-float" style="animation-delay:.5s">
            🔥 Hot Deals Today
          </div>
          <div class="absolute -bottom-3 -right-3 bg-white dark:bg-gray-900 border border-pink-100 dark:border-pink-900 text-xs font-bold text-gray-700 dark:text-gray-200 px-3 py-2 rounded-xl shadow-lg animate-float product-count-badge" style="animation-delay:1.5s">
            ✅ 582+ Products
          </div>
        </div>
      </div>

      <!-- Animated scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up stagger-6">
        <span class="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <div class="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-300 flex justify-center pt-1.5">
          <div class="w-1 h-2 bg-pink-500 rounded-full" style="animation:float 1.5s ease-in-out infinite"></div>
        </div>
      </div>
    </section>

    <!-- ══ MARQUEE ══ -->
    <div class="bg-linear-to-r from-pink-500 via-violet-500 to-blue-500 py-3 overflow-hidden">
      <div class="marquee-track animate-marquee">
        <span v-for="(item,i) in [...marqueeItems,...marqueeItems]" :key="i" class="marquee-item text-white text-sm font-bold tracking-wide">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-btn-primary {
  display:inline-flex;align-items:center;gap:.5rem;
  background:linear-gradient(to right,#ec4899,#8b5cf6);
  color:white;padding:.85rem 2rem;border-radius:9999px;
  font-weight:700;font-size:1rem;transition:all .3s;
  cursor:pointer;box-shadow:0 8px 30px rgba(236,72,153,.35);
  text-decoration:none;border:none;
}

.hero-btn-primary:hover {
  transform:translateY(-2px);
  box-shadow:0 14px 40px rgba(236,72,153,.5);
}

.hero-btn-primary:active {
  transform:translateY(0) scale(.97);
}

.hero-btn-outline {
  display:inline-flex;align-items:center;
  border:2px solid #ec4899;color:#ec4899;
  padding:.85rem 2rem;border-radius:9999px;
  font-weight:700;font-size:1rem;transition:all .3s;
  cursor:pointer;text-decoration:none;
  background:rgba(255,255,255,.5);backdrop-filter:blur(10px);
}

.hero-btn-outline:hover {
  background:rgba(236,72,153,.08);
  transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(236,72,153,.2);
}

.shimmer-text {
  background:linear-gradient(90deg,#ec4899,#8b5cf6,#3b82f6,#ec4899);
  background-size:300% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:shimmerText 3.5s linear infinite;
}

@keyframes shimmerText {
  0%{background-position:0% 50%}
  100%{background-position:300% 50%}
}
</style>
