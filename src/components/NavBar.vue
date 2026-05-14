<template>
  <header class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="navbar-brand group shrink-0">
          <img src="/logo.png" alt="" class="navbar-brand-mark object-contain group-hover:scale-115 transition-transform duration-300 drop-shadow-md"/>
          <span class="navbar-brand-text font-display text-lg font-bold tracking-tight select-none">CeylonCart</span>
    </RouterLink>

    <!-- Nav Links -->
    <ul class="nav-links">
      <li>
        <RouterLink to="/" :class="{ active: route.path === '/' }">
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/products" :class="{ active: route.path.startsWith('/products') }">
          Products
        </RouterLink>
      </li>
    </ul>

    <!-- Search -->
    <div class="search-box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search CeylonCart…"
        @keyup.enter="handleSearch"
      />
    </div>

    <div class="spacer"></div>

    <!-- Right Side -->
    <div class="nav-right">

      <!-- Dark Mode -->
      <button class="icon-btn" title="Toggle dark mode" @click="toggleDark">
        <svg v-if="!isDark" class="nav-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
        <svg v-else class="nav-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </button>

      <!-- Wishlist -->
      <RouterLink to="/wishlist" class="icon-btn" title="Wishlist">
        <svg class="nav-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </RouterLink>

      <!-- Cart -->
      <RouterLink to="/cart" class="icon-btn" title="Cart">
        <svg class="nav-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
      </RouterLink>

      <div class="sep"></div>

      <!-- Sign In -->
      <button class="btn-signin">
        <i class="fa-regular fa-user"></i>
        Sign In
      </button>

      <!-- Hamburger -->
      <button class="icon-btn" title="Menu" @click="mobileOpen = !mobileOpen">
        <i :class="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
      </button>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const searchQuery = ref('')
const isDark = ref(false)
const mobileOpen = ref(false)

const route = useRoute()
const router = useRouter()

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

function handleSearch() {
  const search = searchQuery.value.trim()
  if (!search) return

  router.push({
    path: '/products',
    query: { search },
  })
  searchQuery.value = ''
  mobileOpen.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

* { margin: 0; padding: 0; box-sizing: border-box; }

/* ─── NAVBAR ─── */
.navbar {
  width: 100%;
  height: 64px;
  background: transparent;
  border-bottom: 1px solid currentColor;
  display: flex;
  align-items: center;
  padding: 0 32px;
  gap: 24px;
  font-family: 'DM Sans', sans-serif;
  color: inherit;
}

/* ─── LOGO ─── */
.navbar-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  text-decoration: none;
  color: inherit;
}
.navbar-brand-mark {
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  object-fit: contain;
  flex-shrink: 0;
}
.navbar-brand-text {
  white-space: nowrap;
  line-height: 1;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: inherit;
  letter-spacing: -0.4px;
}

/* ─── NAV LINKS ─── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  flex-shrink: 0;
}
.nav-links a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  border-radius: 8px;
  position: relative;
  transition: opacity 0.13s;
}
.nav-links a i { font-size: 12.5px; }
.nav-links a:hover {
  opacity: 0.72;
}
.nav-links a.active {
  font-weight: 600;
}
.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
}

/* ─── SEARCH ─── */
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: 380px;
  height: 38px;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0 18px;
}
.search-box i { color: inherit; font-size: 13px; flex-shrink: 0; opacity: 0.65; }
.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  color: inherit;
}
.search-box input::placeholder { color: inherit; opacity: 0.65; }

/* ─── SPACER ─── */
.spacer { flex: 1; }

/* ─── RIGHT ICONS ─── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.icon-btn {
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  border-radius: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 15px;
  position: relative;
  transition: opacity 0.13s;
}
.icon-btn:hover { opacity: 0.72; }

.nav-svg {
  width: 20px;
  height: 20px;
}

.sep {
  width: 1px;
  height: 22px;
  background: currentColor;
  margin: 0 6px;
}

/* ─── SIGN IN ─── */
.btn-signin {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 20px;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.13s;
  white-space: nowrap;
}

/* ─── MOBILE MENU ─── */
.mobile-menu {
  background: transparent;
  border-bottom: 1px solid currentColor;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'DM Sans', sans-serif;
}
.mobile-search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 40px;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0 18px;
  margin-bottom: 8px;
}
.mobile-search-box i { color: inherit; font-size: 13px; opacity: 0.65; }
.mobile-search-box input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  color: inherit;
}
.mobile-search-box input::placeholder { color: inherit; opacity: 0.65; }
.mob-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  border-radius: 8px;
  transition: opacity 0.12s;
}
.mob-link:hover { opacity: 0.72; }
.mob-link i { font-size: 13px; color: inherit; opacity: 0.65; }
.mob-signin {
  margin-top: 8px;
  justify-content: center;
  width: 100%;
}
</style>
