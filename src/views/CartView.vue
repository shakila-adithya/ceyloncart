<template>
  <div class="min-h-screen -mt-16 pt-20 pb-16 relative overflow-hidden cart-premium">

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,180,254,0.55),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(244,114,182,0.34),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(192,132,252,0.42),transparent_36%),linear-gradient(135deg,#fbf7ff_0%,#f3e8ff_45%,#ffe4f1_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(168,85,247,0.28),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(126,34,206,0.28),transparent_36%),linear-gradient(135deg,#0b0712_0%,#171022_48%,#241136_100%)]"></div>
    <div class="absolute inset-0 bg-white/35 dark:bg-white/4 backdrop-blur-2xl"></div>
    <div class="glass-orb glass-orb-one absolute -top-24 -left-20 h-80 w-80 rounded-full bg-purple-300/35 dark:bg-purple-500/15 blur-3xl"></div>
    <div class="glass-orb glass-orb-two absolute top-20 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/30 dark:bg-fuchsia-500/12 blur-3xl"></div>
    <div class="glass-orb glass-orb-three absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-300/30 dark:bg-violet-500/12 blur-3xl"></div>
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
              Checkout Bag
            </div>

            <h1 class="text-3xl sm:text-4xl font-display font-bold text-gray-950 dark:text-white tracking-tight">
              Shopping Cart
            </h1>

            <p
              v-if="cartStore.totalItems"
              class="text-gray-600 dark:text-gray-300 text-sm mt-1"
            >
              {{ cartStore.totalItems }} items in your cart
            </p>
            <p
              v-else
              class="text-gray-600 dark:text-gray-300 text-sm mt-1"
            >
              Your cart is waiting for something lovely
            </p>
          </div>

          <button
            v-if="cartStore.items.length"
            @click="cartStore.clearCart()"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-red-200/80 dark:border-red-300/20 bg-red-50/90 dark:bg-red-400/10 text-red-600 dark:text-red-200 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-400/15 active:scale-95 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear Cart
          </button>
        </div>
      </div>

      <div class="max-w-5xl mx-auto">
        <!-- Empty Cart -->
        <div
          v-if="cartStore.items.length === 0"
          class="mx-auto max-w-xl text-center rounded-3xl border border-purple-200/70 dark:border-purple-200/10 bg-white/70 dark:bg-purple-100/6 shadow-[0_24px_80px_rgba(126,34,206,0.18)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl px-6 py-20 animate-scale-in"
        >
          <div class="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-fuchsia-100 dark:from-purple-400/20 dark:to-fuchsia-400/20 ring-1 ring-purple-200/80 dark:ring-white/10 shadow-inner">
            <span class="text-5xl animate-float">🛒</span>
          </div>

          <h2 class="text-2xl font-display font-bold text-gray-950 dark:text-white mb-2">
            Your cart is empty
          </h2>

          <p class="text-gray-600 dark:text-gray-300 mb-7 text-sm">
            Browse our products and add something you love.
          </p>

          <RouterLink
            to="/products"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Start Shopping
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-3">
            <TransitionGroup name="cart-item">
              <div
                v-for="item in cartStore.items"
                :key="item.product.id"
                class="cart-line bg-white/70 dark:bg-purple-100/6 border border-purple-200/60 dark:border-purple-200/10 backdrop-blur-xl rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-[0_18px_55px_rgba(126,34,206,0.13)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.30)] hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(126,34,206,0.20)] transition-all"
              >
                <RouterLink :to="`/product/${item.product.id}`" class="shrink-0">
                  <img
                    :src="item.product.thumbnail"
                    class="w-full h-40 sm:w-20 sm:h-20 rounded-xl object-cover ring-1 ring-purple-200/80 dark:ring-white/10 hover:scale-105 transition-transform"
                  />
                </RouterLink>

                <div class="flex-1 min-w-0">
                  <p class="text-xs text-purple-700 dark:text-purple-300 font-semibold capitalize mb-0.5">
                    {{ item.product.brand || item.product.category }}
                  </p>

                  <RouterLink :to="`/product/${item.product.id}`">
                    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-300 transition-colors line-clamp-2">
                      {{ item.product.title }}
                    </h3>
                  </RouterLink>

                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    LKR {{ formatPrice(item.product.price) }} each
                  </p>
                </div>

                <div class="shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-0">
                  <button
                    @click="cartStore.removeItem(item.product.id)"
                    class="h-8 w-8 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div class="flex items-center gap-1.5 bg-purple-50/90 dark:bg-white/8 border border-purple-200/80 dark:border-white/10 rounded-xl p-0.5">
                    <button
                      @click="cartStore.updateQty(item.product.id, item.quantity - 1)"
                      class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-400/15 transition-colors text-purple-700 dark:text-purple-300 font-bold"
                    >
                      −
                    </button>

                    <span class="w-6 text-center text-sm font-bold text-gray-900 dark:text-white">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="cartStore.updateQty(item.product.id, item.quantity + 1)"
                      class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-400/15 transition-colors text-purple-700 dark:text-purple-300 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <p class="font-bold text-sm text-gray-900 dark:text-gray-100">
                    LKR {{ formatPrice(item.product.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Order Summary -->
          <div class="animate-fade-up" style="animation-delay:.2s">
            <div class="bg-white/70 dark:bg-purple-100/6 border border-purple-200/60 dark:border-purple-200/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_22px_80px_rgba(126,34,206,0.16)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.36)] lg:sticky lg:top-24">
              <h2 class="text-lg font-display font-bold text-gray-950 dark:text-white mb-5">
                Order Summary
              </h2>

              <div class="space-y-3 mb-5">
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Subtotal ({{ cartStore.totalItems }} items)</span>
                  <span>LKR {{ formatPrice(cartStore.totalPrice) }}</span>
                </div>

                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
                </div>

                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Tax (8%)</span>
                  <span>LKR {{ formatPrice(cartStore.totalPrice * 0.08) }}</span>
                </div>

                <hr class="border-purple-200/80 dark:border-white/10" />

                <div class="flex justify-between font-bold text-gray-950 dark:text-white">
                  <span>Total</span>
                  <span class="text-purple-700 dark:text-purple-300">
                    LKR {{ formatPrice(cartStore.totalPrice * 1.08) }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  class="flex-1 min-w-0 px-3 py-2 text-sm rounded-xl bg-white/90 dark:bg-white/8 border border-purple-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-400/40"
                />

                <button class="px-3 py-2 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
                  Apply
                </button>
              </div>

              <button
                @click="openCheckout"
                class="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                Proceed to Checkout
              </button>

              <div class="grid grid-cols-1 gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Secure checkout</span>
                <span>Multiple payment options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="checkout-modal">
        <div
          v-if="checkoutOpen"
          class="fixed inset-0 z-9999 flex items-start justify-center overflow-y-auto px-4 py-20 sm:py-8 bg-gray-950/65 backdrop-blur-md"
          @click.self="closeCheckout"
        >
          <div class="checkout-panel w-full max-w-3xl rounded-3xl border border-purple-200/70 dark:border-purple-200/10 bg-white/95 dark:bg-gray-950/95 shadow-[0_32px_100px_rgba(76,29,149,0.38)] backdrop-blur-2xl">
          <div v-if="!orderPlaced" class="p-5 sm:p-7">
            <div class="flex items-start justify-between gap-4 mb-6">
              <div>
                <div class="inline-flex items-center gap-2 rounded-full border border-purple-200/80 dark:border-purple-300/20 bg-purple-50/80 dark:bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-200 mb-3">
                  <span class="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
                  Secure Checkout
                </div>
                <h2 class="text-2xl sm:text-3xl font-display font-bold text-gray-950 dark:text-white">
                  Complete Your Order
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Review your delivery details before placing the order.
                </p>
              </div>

              <button
                @click="closeCheckout"
                class="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors"
                aria-label="Close checkout"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div class="lg:col-span-3 space-y-4">
                <div class="checkout-card">
                  <h3 class="checkout-title">Customer</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label class="checkout-field">
                      <span>Full name</span>
                      <input v-model="checkoutForm.name" type="text" />
                    </label>
                    <label class="checkout-field">
                      <span>Email</span>
                      <input v-model="checkoutForm.email" type="email" />
                    </label>
                    <label class="checkout-field sm:col-span-2">
                      <span>Phone number</span>
                      <input v-model="checkoutForm.phone" type="tel" placeholder="07X XXX XXXX" />
                    </label>
                  </div>
                </div>

                <div class="checkout-card">
                  <h3 class="checkout-title">Delivery</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label class="checkout-field sm:col-span-2">
                      <span>Address</span>
                      <input v-model="checkoutForm.address" type="text" placeholder="Street address" />
                    </label>
                    <label class="checkout-field">
                      <span>City</span>
                      <input v-model="checkoutForm.city" type="text" placeholder="Colombo" />
                    </label>
                    <label class="checkout-field">
                      <span>Payment</span>
                      <select v-model="checkoutForm.payment">
                        <option>Cash on Delivery</option>
                        <option>Card Payment</option>
                        <option>Bank Transfer</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-2">
                <div class="checkout-card lg:sticky lg:top-4">
                  <h3 class="checkout-title">Order Total</h3>

                  <div class="space-y-3 text-sm mb-5">
                    <div class="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>LKR {{ formatPrice(cartStore.totalPrice) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-300">Shipping</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
                    </div>
                    <div class="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Tax (8%)</span>
                      <span>LKR {{ formatPrice(taxAmount) }}</span>
                    </div>
                    <hr class="border-purple-200/80 dark:border-white/10" />
                    <div class="flex justify-between text-base font-bold text-gray-950 dark:text-white">
                      <span>Total</span>
                      <span class="text-purple-700 dark:text-purple-300">LKR {{ formatPrice(orderTotal) }}</span>
                    </div>
                  </div>

                  <div class="rounded-2xl bg-purple-50/80 dark:bg-purple-400/10 border border-purple-200/80 dark:border-purple-300/15 p-3 mb-4">
                    <p class="text-xs font-semibold text-purple-700 dark:text-purple-200">
                      Estimated delivery
                    </p>
                    <p class="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                      2-4 business days
                    </p>
                  </div>

                  <button
                    @click="placeOrder"
                    class="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="p-8 sm:p-10 text-center">
            <div class="mx-auto mb-6 h-20 w-20 rounded-full bg-linear-to-br from-emerald-100 to-purple-100 dark:from-emerald-400/20 dark:to-purple-400/20 ring-1 ring-emerald-200/80 dark:ring-white/10 flex items-center justify-center">
              <svg class="w-10 h-10 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>

            <h2 class="text-2xl sm:text-3xl font-display font-bold text-gray-950 dark:text-white mb-2">
              Order Placed Successfully
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-7">
              Thank you for shopping with CeylonCart. Your demo order has been confirmed.
            </p>

            <RouterLink
              to="/products"
              @click="closeCheckout"
              class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Continue Shopping
            </RouterLink>
          </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const authStore = useAuthStore()
const checkoutOpen = ref(false)
const orderPlaced = ref(false)
const checkoutForm = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  payment: 'Cash on Delivery',
})

const taxAmount = computed(() => cartStore.totalPrice * 0.08)
const orderTotal = computed(() => cartStore.totalPrice + taxAmount.value)

function formatPrice(p: number) {
  return (p * 320).toLocaleString('en-LK', { maximumFractionDigits: 2 })
}

function openCheckout() {
  checkoutForm.name = [authStore.user?.firstName, authStore.user?.lastName].filter(Boolean).join(' ')
  checkoutForm.email = authStore.user?.email || ''
  orderPlaced.value = false
  checkoutOpen.value = true
}

function closeCheckout() {
  checkoutOpen.value = false
}

function placeOrder() {
  orderPlaced.value = true
  cartStore.clearCart()
}

watch(checkoutOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.cart-premium {
  isolation: isolate;
}

.premium-grid {
  background-image:
    linear-gradient(rgba(126, 34, 206, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190, 24, 93, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.glass-orb {
  animation: glass-float 12s ease-in-out infinite;
}

.glass-orb-two {
  animation-delay: 2s;
}

.glass-orb-three {
  animation-delay: 4s;
}

@keyframes glass-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  33% {
    transform: translate3d(28px, -34px, 0) scale(1.08);
  }

  66% {
    transform: translate3d(-22px, 24px, 0) scale(0.96);
  }
}

.cart-line {
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.9);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.checkout-panel {
  scrollbar-width: thin;
  scrollbar-color: rgba(168, 85, 247, 0.45) transparent;
}

.checkout-card {
  border: 1px solid rgba(216, 180, 254, 0.65);
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.62);
  padding: 1rem;
}

.dark .checkout-card {
  border-color: rgba(216, 180, 254, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.checkout-title {
  margin-bottom: 0.875rem;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.dark .checkout-title {
  color: #ffffff;
}

.checkout-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.checkout-field span {
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b7280;
}

.dark .checkout-field span {
  color: #c4b5fd;
}

.checkout-field input,
.checkout-field select {
  width: 100%;
  border: 1px solid rgba(216, 180, 254, 0.8);
  border-radius: 0.875rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 0.875rem;
  color: #111827;
  font-size: 0.875rem;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.checkout-field input:focus,
.checkout-field select:focus {
  border-color: #c084fc;
  box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.2);
}

.checkout-modal-enter-active,
.checkout-modal-leave-active {
  transition: opacity 0.25s ease;
}

.checkout-modal-enter-active .checkout-panel,
.checkout-modal-leave-active .checkout-panel {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.checkout-modal-enter-from,
.checkout-modal-leave-to {
  opacity: 0;
}

.checkout-modal-enter-from .checkout-panel,
.checkout-modal-leave-to .checkout-panel {
  opacity: 0;
  transform: translateY(18px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .glass-orb,
  .cart-line,
  .cart-line:hover,
  .cart-item-enter-active,
  .cart-item-leave-active,
  .checkout-modal-enter-active,
  .checkout-modal-leave-active,
  .checkout-modal-enter-active .checkout-panel,
  .checkout-modal-leave-active .checkout-panel {
    animation: none;
    transition: none;
    transform: none;
  }
}
</style>
