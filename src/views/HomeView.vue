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

      <div class="hero-inner w-full max-w-354.5 mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center relative z-10">

        <!-- Left text -->
        <div class="hero-copy text-center md:text-left mx-auto lg:mx-0">
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
          <div class="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-3 sm:gap-4 animate-fade-up stagger-4">
            <RouterLink to="/products" class="hero-btn-primary group justify-center">
              <span>Shop Now</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </RouterLink>
            <RouterLink to="/products" class="hero-btn-outline">Browse Categories</RouterLink>
          </div>

          <!-- Trust badges with count-up animation -->
          <div class="hero-stats grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-start gap-3 sm:gap-5 mt-10 animate-fade-up stagger-5">
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
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-fade-up stagger-6">
        <span class="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <div class="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-300 flex justify-center pt-1.5">
          <div class="w-1 h-2 bg-pink-500 rounded-full" style="animation:float 1.5s ease-in-out infinite"></div>
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="bg-linear-to-r from-pink-500 via-violet-500 to-blue-500 py-3 overflow-hidden">
      <div class="marquee-track animate-marquee">
        <span v-for="(item,i) in [...marqueeItems,...marqueeItems]" :key="i" class="marquee-item text-white text-sm font-bold tracking-wide">{{ item }}</span>
      </div>
    </div>

    <!-- PROMO BANNER + BRAND LOGOS -->
    <BrandBanner />

    <!-- SHOP BY CATEGORY -->
    <section class="section-warm py-15 px-4 sm:px-6 lg:px-8">
      <div class="max-w-350 mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 reveal" :ref="el=>io(el)">
          <div>
            <p class="text-pink-500 font-bold text-sm mb-1 uppercase tracking-widest">Explore</p>
            <h2 class="section-h2 dark:text-dark!">Shop By Category</h2>
          </div>
          <RouterLink to="/products" class="text-sm text-pink-500 font-bold hover:text-pink-600 flex items-center gap-1 group">
            View All <span class="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </RouterLink>
        </div>
        <div v-if="catLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div v-for="i in 12" :key="i" class="skeleton rounded-2xl h-28"></div>
        </div>
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <RouterLink v-for="(cat) in displayCategories" :key="cat.slug" :to="`/category/${cat.slug}`"
            class="group relative rounded-2xl overflow-hidden cursor-pointer reveal-scale hover:-translate-y-1.5 transition-all duration-300 aspect-square min-h-28"
            :ref="el=>io(el)">
            <img :src="getCatImg(cat.slug)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" loading="lazy"/>
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute inset-0 bg-linear-to-br from-pink-600/0 to-violet-600/0 group-hover:from-pink-600/5 group-hover:to-violet-600/5 transition-all duration-400"></div>
            <span class="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold capitalize px-1 leading-tight">{{ cat.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!--AD BANNER-->
    <BannerSlider />

    <!--FEATURED PRODUCTS-->
    <div class="absolute top-668 left-0 right-0 h-0.75 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500"></div>
    <section class="section-cool py-20 px-4 sm:px-6 lg:px-8 wave-top">
      <div class="max-w-350 mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 reveal" :ref="el=>io(el)">
          <div>
            <p class="text-violet-500 font-bold text-sm mb-1 uppercase tracking-widest">Handpicked</p>
            <h2 class="section-h2 dark:text-white">Featured Products</h2>
          </div>
          <RouterLink to="/products" class="text-sm text-violet-500 font-bold hover:text-violet-600 flex items-center gap-1 group">
            See All <span class="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </RouterLink>
        </div>
        <div v-if="featuredLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <SkeletonCard v-for="i in 5" :key="i"/>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <div v-for="(p) in featuredProducts" :key="p.id">
            <ProductCard :product="p"/>
          </div>
        </div>
      </div>
    </section>

    <!--TODAY DEALS-->
    <TodayDeals/>

    <!--NEWSLETTER -->
    <section class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="max-w-350 mx-auto">
        <div class="newsletter-bg rounded-3xl p-6 sm:p-10 md:p-14 text-center relative overflow-hidden reveal-zoom" :ref="el=>io(el)">
          <div class="absolute inset-0 opacity-15">
            <div class="absolute top-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div class="absolute top-5 right-14 w-8 h-8 bg-white/20 rounded-full animate-float"></div>
          <div class="absolute bottom-7 left-20 w-5 h-5 bg-white/25 rounded-full animate-float" style="animation-delay:1.2s"></div>
          <div class="absolute top-10 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-float" style="animation-delay:2.4s"></div>
          <div class="absolute bottom-10 right-1/4 w-4 h-4 bg-white/15 rounded-full animate-float-slow" style="animation-delay:.6s"></div>
          <h2 class="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white mb-3 relative z-10 leading-tight">JOIN THE HAPPY CROWD</h2>
          <p class="text-white/80 font-semibold tracking-widest text-xs sm:text-sm mb-6 sm:mb-8 relative z-10 uppercase">Get new arrivals &amp; exclusive offers in your inbox</p>
          <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto relative z-10">
            <input type="email" placeholder="Enter your email…"
              class="flex-1 px-5 py-3.5 rounded-full bg-white/25 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"/>
            <button class="px-7 py-3.5 bg-white text-pink-600 rounded-full font-extrabold text-sm hover:bg-pink-50 active:scale-95 transition-all shadow-xl whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>
    </section>

    <!-- POPULAR CATEGORIES -->
    <section class="section-peach py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-350 mx-auto">
        <div class="mb-10 reveal" :ref="el=>io(el)">
          <p class="text-pink-500 font-bold text-sm mb-1 uppercase tracking-widest">Browse</p>
          <h2 class="section-h2 dark:text-white!">Popular Categories</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <RouterLink v-for="(pc) in popularCategories" :key="pc.slug" :to="`/category/${pc.slug}`"
            class="group relative rounded-2xl overflow-hidden cursor-pointer reveal hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-pink-500/15"
            :ref="el=>io(el)">
            <img :src="pc.img" class="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-600" loading="lazy"
              @error="(e:any) => e.target.src=pc.fallback"/>
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent"></div>
            <div class="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/60 rounded-2xl transition-all duration-300"></div>
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-linear-to-br from-pink-600/0 to-violet-600/0 group-hover:from-pink-600/0 group-hover:to-violet-600/0 transition-all duration-400"></div>
            <div class="absolute bottom-0 left-0 right-0 p-3 transform transition-transform duration-300">
              <p class="text-white text-xs font-bold">{{ pc.name }}</p>
              <p class="text-white/70 text-xs translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">{{ pc.count }}+ items</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

      <!-- TOP SELLERS -->
    <section class="section-cool py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-350 mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 reveal-flip-x" :ref="el=>io(el)">
          <div>
            <p class="text-pink-500 font-bold text-sm mb-1 uppercase tracking-widest">Best of the Best</p>
            <h2 class="section-h2 dark:text-white!">Top Sellers</h2>
          </div>
          <RouterLink to="/products" class="text-sm text-pink-500 font-bold hover:text-pink-600 flex items-center gap-1 group">
            View All <span class="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </RouterLink>
        </div>
        <div v-if="topLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <SkeletonCard v-for="i in 5" :key="i"/>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <div v-for="(p) in topProducts" :key="p.id">
            <ProductCard :product="p"/>
          </div>
        </div>
      </div>
    </section>

      <!-- CeylonCart newsletter 2 -->
    <section class="px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-350 mx-auto reveal-blur" :ref="el=>io(el)">
        <div class="ad-premium rounded-3xl overflow-hidden relative">
          <div class="absolute inset-0 opacity-10"
            style="background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.4) 39px,rgba(255,255,255,.4) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.4) 39px,rgba(255,255,255,.4) 40px)"></div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl animate-blob"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl animate-blob" style="animation-delay:3s"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
            <div class="shrink-0 relative">
              <div class="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-linear-to-br from-yellow-400/25 to-orange-400/25 border border-yellow-400/30 flex items-center justify-center animate-glow-pulse">
                <svg viewBox="0 0 80 80" class="w-20 h-20 md:w-28 md:h-28 animate-float">
                  <circle cx="40" cy="40" r="38" fill="rgba(251,191,36,.15)" stroke="rgba(251,191,36,.4)" stroke-width="1"/>
                  <path d="M20 30 L48 20 L48 55 L20 48 Z" fill="rgba(251,191,36,.85)" stroke="rgba(251,191,36,1)" stroke-width="1" stroke-linejoin="round"/>
                  <rect x="14" y="30" width="8" height="18" rx="3" fill="rgba(251,191,36,.9)"/>
                  <path d="M22 48 L26 56 L30 56 L26 48Z" fill="rgba(251,191,36,.7)"/>
                  <circle cx="55" cy="30" r="5" fill="rgba(251,191,36,.5)"/>
                  <circle cx="58" cy="40" r="3.5" fill="rgba(251,191,36,.4)"/>
                  <circle cx="55" cy="50" r="4" fill="rgba(251,191,36,.5)"/>
                  <line x1="48" y1="22" x2="54" y2="27" stroke="rgba(251,191,36,.8)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="48" y1="37" x2="54" y2="37" stroke="rgba(251,191,36,.8)" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="48" y1="52" x2="54" y2="47" stroke="rgba(251,191,36,.8)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 bg-linear-to-r from-yellow-400 to-orange-500 text-black text-xs font-black px-2.5 py-1 rounded-full shadow-lg rotate-12">HOT 🔥</div>
            </div>
            <div class="flex-1 text-center md:text-left">
              <p class="text-yellow-400/80 text-xs font-black tracking-widest mb-2 uppercase">Promoted Partner</p>
              <h3 class="text-white text-2xl sm:text-3xl md:text-4xl font-display font-black mb-3 leading-tight">
                SELLS WITH <span class="bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">CyelonCart</span>
              </h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
                Reach <strong class="text-yellow-400">millions of shoppers</strong> across Sri Lanka. Grow your business, boost your brand, and drive real sales today.
              </p>
              <div class="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span v-for="f in adFeatures" :key="f" class="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-gray-200 border border-white/15 hover:bg-white/20 transition-colors cursor-default">{{ f }}</span>
              </div>
            </div>
            <div class="w-full md:w-auto shrink-0 flex flex-col items-center gap-3">
              <button class="px-8 py-4 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-black rounded-2xl text-sm
                             hover:from-yellow-300 hover:to-orange-400 active:scale-95 transition-all
                             shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 whitespace-nowrap w-full md:w-auto">
                Start Advertising →
              </button>
              <p class="text-gray-500 text-xs">No setup fees · Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import BrandBanner from '../components/BrandBanner.vue'
import BannerSlider from '../components/BannerSlider.vue'
import ProductCard from '../components/ProductCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import TodayDeals from '../components/TodaysDeals.vue'
import { useCategories, useProducts } from '../composables/useProducts'
import type { Product } from '../types/Product.ts'

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

const adFeatures = ['📊 Analytics','🎯 Targeted Ads','📱 Mobile First','⚡ Instant Setup']

/*Category images*/
const catImgMap: Record<string,string> = {
  beauty:              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop&auto=format',
  fragrances:          'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop&auto=format',
  furniture:           'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&auto=format',
  groceries:           'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop&auto=format',
  'home-decoration':   'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop&auto=format',
  'kitchen-accessories':'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&auto=format',
  laptops:             'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&auto=format',
  'mens-shirts':       'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop&auto=format',
  'mens-shoes':        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format',
  'mens-watches':      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&auto=format',
  'mobile-accessories':'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop&auto=format',
  motorcycle:          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format',
  'skin-care':         'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=200&h=200&fit=crop&auto=format',
  smartphones:         'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format',
  'sports-accessories':'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop&auto=format',
  sunglasses:          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop&auto=format',
  tablets:             'https://images.unsplash.com/photo-1544244015-0df4702699b1?w=200&h=200&fit=crop&auto=format',
  tops:                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop&auto=format',
  vehicle:             'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop&auto=format',
  'womens-bags':       'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop&auto=format',
  'womens-dresses':    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop&auto=format',
  'womens-jewellery':  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop&auto=format',
  'womens-shoes':      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop&auto=format',
  'womens-watches':    'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=200&h=200&fit=crop&auto=format',
}

const { products: featuredRaw, loading: featuredLoading, fetchProducts: fetchFeatured } = useProducts()
const { products: topRaw, loading: topLoading, fetchProducts: fetchTop } = useProducts()
const { categories, loading: catLoading, fetchCategories } = useCategories()

const displayCategories = ref<any[]>([])
const topProducts = ref<Product[]>([])
const featuredProducts = ref<Product[]>([])

const popularCategories = [
  {
    slug:'fragrances', name:'Fragrances',
    img:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/perfume2024/400/300',
    count:30
  },
  {
    slug:'groceries', name:'Chocolates',
    img:'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/chocolate2024/400/300',
    count:80
  },
  {
    slug:'womens-jewellery', name:'Jewellery',
    img:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/jewellery2024/400/300',
    count:50
  },
  {
    slug:'beauty', name:'Flower Shop',
    img:'https://images.unsplash.com/photo-1487530811015-780780169993?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/flowers2024/400/300',
    count:25
  },
  {
    slug:'skin-care', name:'Cosmetics',
    img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/cosmetics2024/400/300',
    count:60
  },
  {
    slug:'home-decoration', name:'Home Decor',
    img:'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop&auto=format',
    fallback:'https://picsum.photos/seed/homedecor2024/400/300',
    count:40
  },
]

function getCatImg(slug: string) {
  return catImgMap[slug] || `https://picsum.photos/seed/${slug}v2/200/200`
}

let observer: IntersectionObserver

function io(el: any) {
  if (!el || !observer) return
  const node = (el as any).$el ?? el
  if (node instanceof Element) observer.observe(node)
}

onMounted(async () => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show')
        // For bounce/zoom/rotate/blur classes that use animation
        const el = e.target as HTMLElement
        if (el.classList.contains('reveal-bounce') ||
            el.classList.contains('reveal-zoom') ||
            el.classList.contains('reveal-rotate') ||
            el.classList.contains('reveal-clip') ||
            el.classList.contains('reveal-flip-x') ||
            el.classList.contains('reveal-blur')) {
          el.style.opacity = '1'
        }
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  await fetchCategories()
  displayCategories.value = categories.value.slice(0, 12)

  await fetchFeatured(8, 0)
  featuredProducts.value = featuredRaw.value.slice(0, 5)

  await fetchTop(8, 8)
  topProducts.value = topRaw.value.slice(0, 5)
})
</script>

<style scoped>
.newsletter-bg { background:linear-gradient(135deg,#f97316 0%,#ec4899 45%,#8b5cf6 100%); }
.ad-premium    { background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#0f172a 70%,#1c1917 100%); }

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
