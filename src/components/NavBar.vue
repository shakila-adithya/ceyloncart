<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
      scrolled ? ['glass', 'navbar-glass'] : 'bg-transparent',
    ]"
  >
    <div class="w-full max-w-354.5 h-full mx-auto px-6 sm:px-8 lg:px-10">
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
            <span v-if="wishlistStore.total > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-badge">
              {{ wishlistStore.total }}
            </span>
          </RouterLink>

          <RouterLink to="/cart" class="icon-btn relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-violet-500 text-white text-xs rounded-full flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Profile -->
          <div v-if="authStore.isLoggedIn" class="relative" ref="profileRef">
            <button @click.stop="profileOpen = !profileOpen"
              class="flex items-center gap-2 pl-1 py-1 pr-2 rounded-full hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <img :src="authStore.user?.image" class="w-8 h-8 rounded-full object-cover ring-2 ring-pink-400 ring-offset-1"/>
              <span class="hidden lg:block text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-18 truncate">
                {{ authStore.user?.firstName }}
              </span>
              <svg class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="profileOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition name="dropdown">
              <div v-if="profileOpen"
                class="absolute right-0 mt-2 w-70 bg-white dark:bg-gray-900 rounded-3xl shadow-3xl shadow-pink-500/10
                       border border-pink-100/50 dark:border-gray-800 overflow-hidden z-50">
                       
                <!-- User info -->
                <div class="px-4 py-3 bg-linear-to-r from-pink-50 to-violet-50 dark:from-gray-800 dark:to-gray-800">
                  <div class="flex items-center gap-3">
                    <img :src="authStore.user?.image" class="w-10 h-10 rounded-full object-cover ring-2 ring-pink-300"/>
                    <div class="min-w-0">
                      <p class="text-sm font-bold text-gray-800 dark:text-white truncate">
                        {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.user?.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="p-2">
                  <RouterLink to="/wishlist" @click="profileOpen = false"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300
                           hover:bg-pink-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    My Wishlist
                  </RouterLink>
                  <RouterLink to="/cart" @click="profileOpen = false"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300
                           hover:bg-pink-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    My Cart
                  </RouterLink>
                  <hr class="my-1 border-gray-100 dark:border-gray-800"/>
                  <button @click="doLogout"
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500
                           hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <RouterLink v-else to="/login" class="hidden md:flex btn-signin text-sm">Sign In</RouterLink>

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
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const scrolled = ref(false)
const isDark = ref(false)
const searchQuery = ref('')
const profileOpen = ref(false)
const mobileOpen = ref(false)

function doLogout() {
  authStore.logout()
  profileOpen.value = false
  mobileOpen.value = false
  router.push('/')
}

function doSearch() {
  const search = searchQuery.value.trim()
  if (!search) return

  router.push({ path: '/products', query: { search } })
  searchQuery.value = ''
}
function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
  scrolled.value = scrollTop > 8
}

function setDarkMode(value: boolean) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('ceyloncart_dark', value ? '1' : '0')
}

function toggleDark() {
  setDarkMode(!isDark.value)
}

onMounted(() => {
  setDarkMode(localStorage.getItem('ceyloncart_dark') === '1')
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('scroll', onScroll)
})
</script>
