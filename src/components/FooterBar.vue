<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-300 mt-20 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-72 h-72 bg-pink-900/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Stats -->
    <div class="relative border-b border-gray-800">
      <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-3 group hover:scale-105 transition-transform">
            <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-pink-600/15 to-violet-600/15 border border-pink-500/20 flex items-center justify-center text-xl group-hover:border-pink-400/40 transition-colors">
              {{ stat.icon }}
            </div>
            <div>
              <p class="text-white font-bold text-sm leading-tight">{{ stat.value }}</p>
              <p class="text-gray-500 text-xs">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- grid -->
    <div class="relative max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <!-- Brand -->
        <div>
          <RouterLink to="/" class="flex items-center gap-2 mb-5">
            <img src="/logo.png" alt="CeylonCart" class="w-10 h-10 object-contain drop-shadow-md"/>
            <span class="font-display text-lg font-bold bg-linear-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">CeylonCart</span>
          </RouterLink>
          <p class="text-gray-400 text-sm leading-relaxed mb-5">Sri Lanka's trusted destination for quality products. Discover the best deals, curated with care.</p>
          <div class="flex gap-2">
            <a v-for="s in socials" :key="s" href="#"
               class="w-8 h-8 rounded-xl bg-gray-800 hover:bg-linear-to-br hover:from-pink-600 hover:to-violet-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 text-xs font-bold">
              {{ s }}
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-white font-bold text-sm mb-5 flex items-center gap-2">
            <span class="w-1 h-4 bg-linear-to-b from-pink-500 to-violet-500 rounded-full"></span>Categories
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in categoryLinks" :key="link.name">
              <RouterLink :to="link.path" class="text-gray-400 text-sm hover:text-pink-400 transition-colors flex items-center gap-1.5 group">
                <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">›</span>{{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-white font-bold text-sm mb-5 flex items-center gap-2">
            <span class="w-1 h-4 bg-linear-to-b from-pink-500 to-violet-500 rounded-full"></span>Company
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in companyLinks" :key="link">
              <a href="#" class="text-gray-400 text-sm hover:text-pink-400 transition-colors flex items-center gap-1.5 group">
                <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity">›</span>{{ link }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-white font-bold text-sm mb-5 flex items-center gap-2">
            <span class="w-1 h-4 bg-linear-to-b from-pink-500 to-violet-500 rounded-full"></span>Stay Updated
          </h4>
          <p class="text-gray-400 text-xs mb-3 leading-relaxed">Get new arrivals and exclusive offers in your inbox.</p>
          <div class="space-y-2">
            <input type="email" placeholder="your@email.com"
                   class="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"/>
            <button class="w-full py-2.5 rounded-xl bg-linear-to-r from-pink-500 to-violet-500 text-white text-sm font-semibold hover:from-pink-600 hover:to-violet-600 hover:shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="relative border-t border-gray-800">
      <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {{ new Date().getFullYear() }} <span class="text-pink-400 font-semibold">CeylonCart</span>. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const stats = [
  { icon: '🛍️', value: '582+ Products', label: 'Wide Selection' },
  { icon: '🚚', value: 'Free Shipping', label: 'Orders over LKR 5000' },
  { icon: '💳', value: 'Secure Pay', label: '100% Protected' },
  { icon: '🔄', value: '30-Day Returns', label: 'Easy Returns' },
]
const categoryLinks = [
  { name: 'Electronics', path: '/category/smartphones' },
  { name: 'Clothing',    path: '/category/mens-shirts' },
  { name: 'Beauty',      path: '/category/beauty' },
  { name: 'Jewellery',   path: '/category/womens-jewellery' },
  { name: 'Furniture',   path: '/category/furniture' },
  { name: 'Sports',      path: '/category/sports-accessories' },
]
const companyLinks = ['About Us', 'Careers', 'Press', 'Blog', 'Contact']
const socials = ['f', 'X', '▶', 'in']
</script>
