<template>
  <div class="min-h-screen -mt-16 pt-20 pb-16 relative overflow-hidden profile-premium">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,180,254,0.55),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(244,114,182,0.34),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(192,132,252,0.42),transparent_36%),linear-gradient(135deg,#fbf7ff_0%,#f3e8ff_45%,#ffe4f1_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(168,85,247,0.28),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(126,34,206,0.28),transparent_36%),linear-gradient(135deg,#0b0712_0%,#171022_48%,#241136_100%)]"></div>
    <div class="absolute inset-0 bg-white/35 dark:bg-white/4 backdrop-blur-2xl"></div>
    <div class="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-purple-300/35 dark:bg-purple-500/15 blur-3xl"></div>
    <div class="absolute top-20 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/30 dark:bg-fuchsia-500/12 blur-3xl"></div>
    <div class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-300/30 dark:bg-violet-500/12 blur-3xl"></div>
    <div class="absolute inset-0 premium-grid opacity-60 dark:opacity-25"></div>

    <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="mb-8 rounded-2xl border border-purple-200/70 dark:border-purple-200/10 bg-white/65 dark:bg-purple-100/6 shadow-[0_24px_80px_rgba(126,34,206,0.18)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl px-5 sm:px-7 py-5 animate-fade-up">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div class="flex items-center gap-4 min-w-0">
            <img
              :src="user?.image"
              :alt="fullName"
              class="h-20 w-20 rounded-3xl object-cover bg-white/80 dark:bg-white/10 ring-4 ring-white/80 dark:ring-white/10 shadow-xl shadow-purple-500/20"
            />

            <div class="min-w-0">
              <div class="inline-flex items-center gap-2 rounded-full border border-purple-200/80 dark:border-purple-300/20 bg-purple-50/80 dark:bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-200 mb-3">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"></span>
                Active Account
              </div>

              <h1 class="text-3xl sm:text-4xl font-display font-bold text-gray-950 dark:text-white tracking-tight truncate">
                {{ fullName }}
              </h1>

              <p class="text-gray-600 dark:text-gray-300 text-sm mt-1 truncate">
                {{ user?.email }}
              </p>
            </div>
          </div>

          <button
            @click="doLogout"
            class="inline-flex w-full md:w-auto items-center justify-center gap-2 px-5 py-3 rounded-full border border-red-200/80 dark:border-red-300/20 bg-red-50/90 dark:bg-red-400/10 text-red-600 dark:text-red-200 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-400/15 active:scale-95 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section class="lg:col-span-2 rounded-2xl border border-purple-200/60 dark:border-purple-200/10 bg-white/70 dark:bg-purple-100/6 shadow-[0_22px_80px_rgba(126,34,206,0.16)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl p-5 sm:p-6 animate-fade-up">
          <div class="flex items-center justify-between gap-4 mb-5">
            <h2 class="text-xl font-display font-bold text-gray-950 dark:text-white">
              Profile Details
            </h2>
            <span class="text-xs font-semibold text-purple-700 dark:text-purple-200 bg-purple-50 dark:bg-purple-400/10 border border-purple-200/80 dark:border-purple-300/20 rounded-full px-3 py-1">
              @{{ user?.username }}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="detail in profileDetails" :key="detail.label" class="detail-tile">
              <div class="detail-icon" :class="detail.tint">
                <component :is="detail.icon" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ detail.label }}</p>
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ detail.value }}</p>
              </div>
            </div>
          </div>
        </section>

        <aside class="rounded-2xl border border-purple-200/60 dark:border-purple-200/10 bg-white/70 dark:bg-purple-100/6 shadow-[0_22px_80px_rgba(126,34,206,0.16)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl p-5 sm:p-6 animate-fade-up" style="animation-delay:.12s">
          <h2 class="text-xl font-display font-bold text-gray-950 dark:text-white mb-5">
            Shopping Snapshot
          </h2>

          <div class="grid grid-cols-2 gap-3 mb-5">
            <RouterLink to="/cart" class="stat-tile">
              <span class="text-2xl font-black text-purple-700 dark:text-purple-200">{{ cartStore.totalItems }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Cart Items</span>
            </RouterLink>

            <RouterLink to="/wishlist" class="stat-tile">
              <span class="text-2xl font-black text-pink-600 dark:text-pink-200">{{ wishlistStore.total }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Saved Items</span>
            </RouterLink>

          </div>

          <div class="space-y-2">
            <RouterLink to="/products" class="profile-action">
              <span>Browse Products</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </RouterLink>

            <RouterLink to="/wishlist" class="profile-action">
              <span>View Wishlist</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </RouterLink>

            <RouterLink to="/cart" class="profile-action">
              <span>View Cart</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </RouterLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const user = computed(() => authStore.user)
const fullName = computed(() =>
  [user.value?.firstName, user.value?.lastName].filter(Boolean).join(' ') || 'CeylonCart Customer'
)

const ProfileIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }),
])
const MailIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z' }),
])
const BadgeIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-3l-4 4z' }),
])
const ShieldIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5-4v6c0 5-3.5 9.74-8 11-4.5-1.26-8-6-8-11V6l8-3 8 3z' }),
])

const profileDetails = computed(() => [
  { label: 'Full Name', value: fullName.value, icon: ProfileIcon, tint: 'text-pink-500 bg-pink-50 dark:bg-pink-400/10' },
  { label: 'Email Address', value: user.value?.email || 'Not available', icon: MailIcon, tint: 'text-violet-500 bg-violet-50 dark:bg-violet-400/10' },
  { label: 'Username', value: user.value?.username || 'Not available', icon: BadgeIcon, tint: 'text-purple-500 bg-purple-50 dark:bg-purple-400/10' },
  { label: 'Customer ID', value: user.value?.id ? `#${user.value.id}` : 'Not available', icon: ShieldIcon, tint: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10' },
])

function doLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-premium {
  isolation: isolate;
}

.premium-grid {
  background-image:
    linear-gradient(rgba(126, 34, 206, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190, 24, 93, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.detail-tile {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-width: 0;
  border: 1px solid rgba(216, 180, 254, 0.65);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.56);
  padding: 1rem;
}

.dark .detail-tile {
  border-color: rgba(216, 180, 254, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  flex-shrink: 0;
}

.stat-tile {
  display: flex;
  min-height: 6rem;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  border: 1px solid rgba(216, 180, 254, 0.65);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.56);
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(126, 34, 206, 0.14);
}

.dark .stat-tile {
  border-color: rgba(216, 180, 254, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.profile-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  border-radius: 0.875rem;
  padding: 0.875rem 1rem;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.52);
  border: 1px solid rgba(216, 180, 254, 0.55);
  transition: all 0.2s ease;
}

.profile-action:hover {
  color: #ec4899;
  background: rgba(253, 242, 248, 0.9);
  transform: translateX(2px);
}

.dark .profile-action {
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(216, 180, 254, 0.12);
}

.dark .profile-action:hover {
  color: #f472b6;
  background: rgba(236, 72, 153, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .stat-tile,
  .stat-tile:hover,
  .profile-action,
  .profile-action:hover {
    transition: none;
    transform: none;
  }
}
</style>
