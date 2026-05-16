<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
      scrolled ? scrolledHeaderClass : 'bg-transparent',
    ]"
  >
    <div class="w-full max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full">
        <RouterLink to="/" class="flex items-center gap-2 group shrink-0">
          <img
            src="/logo.png"
            alt="CeylonCart"
            class="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
          />
          <span class="logo-font text-xl font-bold bg-linear-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent tracking-tight select-none">
            CeylonCart
          </span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="nav-link" :class="{ active: route.path === '/' }">Home</RouterLink>
          <RouterLink to="/products" class="nav-link" :class="{ active: route.path.startsWith('/products') }">
            Products
          </RouterLink>
        </nav>

        <div class="hidden md:flex items-center relative w-64 lg:w-80">
          <input
            v-model="searchQuery"
            @keyup.enter="doSearch"
            type="text"
            placeholder="Search CeylonCart..."
            class="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-pink-50 border border-pink-100 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <svg class="absolute left-3 w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex items-center gap-1.5">
          <button @click="toggleDark" class="icon-btn" title="Toggle dark mode">
            <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <RouterLink to="/wishlist" class="icon-btn relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </RouterLink>

          <RouterLink to="/cart" class="icon-btn relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </RouterLink>

          <button class="hidden md:flex btn-signin text-sm">Sign In</button>

          <button class="icon-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const scrolled = ref(false)
const isDark = ref(false)
const searchQuery = ref('')

const scrolledHeaderClass = computed(() =>
  isDark.value
    ? 'bg-gray-950/92 backdrop-blur-2xl shadow-lg shadow-pink-500/5'
    : 'bg-white/92 backdrop-blur-2xl shadow-lg shadow-pink-500/5'
)

function doSearch() {
  const search = searchQuery.value.trim()
  if (!search) return

  router.push({ path: '/products', query: { search } })
  searchQuery.value = ''
}
function onScroll() {
  scrolled.value = window.scrollY > 20
}

function setDarkMode(value: boolean) {
  isDark.value = value
  localStorage.setItem('ceyloncart_dark', value ? '1' : '0')
}

function toggleDark() {
  setDarkMode(!isDark.value)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  setDarkMode(localStorage.getItem('ceyloncart_dark') === '1')
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
