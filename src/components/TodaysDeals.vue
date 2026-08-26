<template>
  <section class="section-cool py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-350 mx-auto">
      <div class="absolute top-838 left-0 right-0 h-0.75 bg-radial to-blue-500 via-purple-500 from-pink-500  "></div>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 reveal" :ref="el=>reg(el)">
        <div>
          <p class="text-pink-500 font-bold text-xs mb-1 uppercase tracking-[.15em]">
            Limited Time
          </p>

          <h2 class="section-h2 flex items-center gap-3 flex-wrap">
            Today's Deals

            <span
              class="text-xs font-bold text-white px-3 py-1 rounded-full animate-pulse"
              style="background:linear-gradient(to right,#ec4899,#8b5cf6)"
            >
              LIVE
            </span>
          </h2>
        </div>

        <RouterLink
          to="/products"
          class="text-sm text-pink-500 font-semibold hover:text-pink-600 flex items-center gap-1 group"
        >
          All Deals
          <span class="group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </RouterLink>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-3xl h-80 skeleton"
        ></div>
      </div>

      <!-- Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(deal,i) in deals"
          :key="deal.id"
          class="deal-card reveal-scale group flex flex-col rounded-3xl overflow-hidden cursor-pointer"
          :class="glassThemes[i % 4].card"
          :style="{ transitionDelay:(i*80)+'ms' }"
          :ref="el=>reg(el)"
          @click="$router.push(`/product/${deal.id}`)"
        >
          <!-- Image -->
          <div
            class="relative flex items-center justify-center p-4 h-40"
            :class="glassThemes[i % 4].top"
          >
            <div class="glass-shine"></div>

            <div
              class="absolute top-3 left-3 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg"
              :class="glassThemes[i % 4].badge"
            >
              -{{ Math.round(deal.discountPercentage) }}%
            </div>

            <img
              :src="deal.thumbnail"
              :alt="deal.title"
              class="relative z-10 w-35 h-35 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <!-- Body -->
          <div class="flex flex-col flex-1 p-4">
            <p
              class="text-[11px] font-bold uppercase tracking-wide mb-1 category-label"
              :class="glassThemes[i % 4].text"
            >
              {{ deal.category }}
            </p>

            <h3 class="card-title text-sm font-bold leading-snug line-clamp-2 mb-3">
              {{ deal.title }}
            </h3>

            <!-- Price -->
            <div class="flex items-baseline gap-2 flex-wrap mb-3">
              <span class="price-main text-base font-black">
                LKR {{ fmtP(deal.price) }}
              </span>

              <span class="price-original text-xs line-through">
                LKR {{ fmtP(origPrice(deal)) }}
              </span>
            </div>

            <!-- Stock -->
            <div class="mb-3">
              <div class="bar-track h-1.5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-1000"
                  :class="glassThemes[i % 4].bar"
                  :style="{ width:soldPct(deal.stock)+'%' }"
                ></div>
              </div>

              <div class="flex justify-between stock-label text-[10px] mt-1">
                <span>Available {{ deal.stock }}</span>
                <span>Sold {{ Math.max(0,300-deal.stock) }}</span>
              </div>
            </div>

            <!-- Timer -->
            <div class="timer-section mt-auto pt-3">
              <p class="timer-label text-[10px] font-semibold mb-2">
                ⏱ Offer ends in
              </p>

              <div class="flex gap-1.5">
                <div
                  v-for="u in countdownFor(deal.dealEndsAt)"
                  :key="u.label"
                  class="countdown-box flex-1 rounded-xl py-1.5 text-center"
                >
                  <div class="countdown-num font-black text-sm leading-none">
                    {{ u.val }}
                  </div>
                  <div class="countdown-unit text-[8px] uppercase mt-0.5">
                    {{ u.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { RouterLink, useRouter } from "vue-router"
import type { Product } from "../types/Product"

const $router = useRouter()

interface DealProduct extends Product {
  dealEndsAt: number
}

const deals = ref<DealProduct[]>([])
const loading = ref(true)

const nowMs = ref(Date.now())
const dealDurations = [
  2 * 3600 + 18 * 60 + 34,
  5 * 3600 + 42 * 60 + 9,
  8 * 3600 + 7 * 60 + 51,
  11 * 3600 + 25 * 60 + 16,
]

const glassThemes = [
  {
    card: "theme-pink",
    top: "top-pink",
    badge: "badge-pink",
    text: "text-pink-500",
    bar: "bar-pink",
  },
  {
    card: "theme-blue",
    top: "top-blue",
    badge: "badge-blue",
    text: "text-cyan-600",
    bar: "bar-blue",
  },
  {
    card: "theme-gold",
    top: "top-gold",
    badge: "badge-gold",
    text: "text-amber-600",
    bar: "bar-gold",
  },
  {
    card: "theme-violet",
    top: "top-violet",
    badge: "badge-violet",
    text: "text-violet-500",
    bar: "bar-violet",
  },
]

function tick() {
  nowMs.value = Date.now()
}

function countdownFor(endMs: number) {
  const d = Math.max(0, endMs - nowMs.value)

  return [
    {
      label: "Hrs",
      val: String(Math.floor(d / 3600000)).padStart(2, "0"),
    },
    {
      label: "Min",
      val: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"),
    },
    {
      label: "Sec",
      val: String(Math.floor((d % 60000) / 1000)).padStart(2, "0"),
    },
  ]
}

const fmtP = (p:number) =>
  (p * 320).toLocaleString("en-LK", { maximumFractionDigits: 0 })

const origPrice = (d:any) =>
  d.price / (1 - d.discountPercentage / 100)

const soldPct = (stock:number) =>
  Math.min(92, Math.max(12, Math.round(((300-stock)/300)*100)))

let timer:any
let io: IntersectionObserver

function reg(el:any){
  if(!el || !io) return
  const n = el.$el ?? el
  if(n instanceof Element) io.observe(n)
}

onMounted(async()=>{
  io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show")
        io.unobserve(e.target)
      }
    })
  },{ threshold:.08 })

  try{
    const r = await fetch("https://dummyjson.com/products?limit=20")
    const d = await r.json()

    const startedAt = Date.now()
    deals.value = [...d.products]
      .sort((a:any,b:any)=>b.discountPercentage-a.discountPercentage)
      .slice(0,4)
      .map((product:any, index:number) => ({
        ...product,
        dealEndsAt: startedAt + dealDurations[index % dealDurations.length] * 1000,
      }))
  } finally {
    loading.value = false
  }

  tick()
  timer = setInterval(tick,1000)
})

onUnmounted(()=>{
  clearInterval(timer)
})
</script>

<style scoped>
/* animation */
.reveal,
.reveal-scale {
  opacity: 0;
  transform: translateY(24px) scale(.96);
  transition:
    opacity .7s ease,
    transform .7s ease;
}
.show {
  opacity: 1 !important;
  transform: none !important;
}

/* skeleton */
.skeleton {
  border-radius: 1.5rem;
  background: linear-gradient(
    90deg,
    rgba(0,0,0,.04),
    rgba(0,0,0,.08),
    rgba(0,0,0,.04)
  );
  background-size: 200% 100%;
  animation: shine 1.2s linear infinite;
}
.dark .skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,.04),
    rgba(255,255,255,.10),
    rgba(255,255,255,.04)
  );
  background-size: 200% 100%;
}

@keyframes shine {
  to { background-position: -200% 0; }
}

/* main card */
.deal-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,.55);
  box-shadow:
    0 12px 30px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.75);
  transition:
    transform .35s ease,
    box-shadow .35s ease,
    border-color .35s ease;
}

.deal-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 22px 45px rgba(0,0,0,.12),
    inset 0 1px 0 rgba(255,255,255,.9);
}

.dark .deal-card {
  border: 1px solid rgba(255,255,255,.10);
  box-shadow:
    0 12px 35px rgba(0,0,0,.30),
    inset 0 1px 0 rgba(255,255,255,.05);
}

.dark .deal-card:hover {
  box-shadow:
    0 22px 50px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.08);
}

/* glossy shine */
.glass-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    130deg,
    rgba(255,255,255,.38),
    rgba(255,255,255,.12) 22%,
    rgba(255,255,255,0) 42%
  );
}

.dark .glass-shine {
  background: linear-gradient(
    130deg,
    rgba(255,255,255,.14),
    rgba(255,255,255,.04) 22%,
    rgba(255,255,255,0) 42%
  );
}

.deal-card .card-title {
  color: #111827;
}

.deal-card .price-main {
  color: #111827;
}

.deal-card .price-original {
  color: rgba(17,24,39,.45);
}

.deal-card .stock-label {
  color: rgba(17,24,39,.55);
}

.deal-card .timer-label {
  color: rgba(17,24,39,.55);
}

/* countdown boxes */
.deal-card .countdown-box {
  background: rgba(0,0,0,.07);
  border: 1px solid rgba(0,0,0,.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.deal-card .countdown-num {
  color: #111827;
}

.deal-card .countdown-unit {
  color: rgba(17,24,39,.60);
}

.deal-card .bar-track {
  background: rgba(0,0,0,.10);
}

.deal-card .timer-section {
  border-top: 1px solid rgba(0,0,0,.08);
}

.dark .deal-card .card-title {
  color: #ffffff;
}

.dark .deal-card .price-main {
  color: #ffffff;
}

.dark .deal-card .price-original {
  color: rgba(255,255,255,.40);
}

.dark .deal-card .stock-label {
  color: rgba(255,255,255,.55);
}

.dark .deal-card .timer-label {
  color: rgba(255,255,255,.60);
}

.dark .deal-card .countdown-box {
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.10);
}

.dark .deal-card .countdown-num {
  color: #ffffff;
}

.dark .deal-card .countdown-unit {
  color: rgba(255,255,255,.80);
}

.dark .deal-card .bar-track {
  background: rgba(255,255,255,.15);
}

.dark .deal-card .timer-section {
  border-top: 1px solid rgba(255,255,255,.10);
}

.theme-pink {
  background: linear-gradient(135deg, #fff4fa 0%, #fdf2ff 100%);
}

.theme-blue {
  background: linear-gradient(135deg, #eef7ff 0%, #eefcff 100%);
}

.theme-gold {
  background: linear-gradient(135deg, #fff9e8 0%, #fff4d4 100%);
}

.theme-violet {
  background: linear-gradient(135deg, #f5f1ff 0%, #fcf2ff 100%);
}

/* dark mode themes */
.dark .theme-pink {
  background: linear-gradient(
    135deg,
    rgba(236,72,153,.22),
    rgba(91,33,182,.18)
  );
}

.dark .theme-blue {
  background: linear-gradient(
    135deg,
    rgba(59,130,246,.22),
    rgba(6,182,212,.18)
  );
}

.dark .theme-gold {
  background: linear-gradient(
    135deg,
    rgba(251,191,36,.20),
    rgba(245,158,11,.18)
  );
}

.dark .theme-violet {
  background: linear-gradient(
    135deg,
    rgba(139,92,246,.22),
    rgba(217,70,239,.18)
  );
}

.top-pink {
  background: linear-gradient(135deg, #ec4899, #7c3aed);
}

.top-blue {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
}

.top-gold {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.top-violet {
  background: linear-gradient(135deg, #7c3aed, #d946ef);
}

/* badges */
.badge-pink,
.badge-blue,
.badge-violet {
  background: rgba(255,255,255,.18);
  color: #fff !important;
}

.badge-gold {
  background: rgba(0,0,0,.16);
  color: #fff !important;
}

/* progress bars */
.bar-pink {
  background: linear-gradient(to right, #ec4899, #8b5cf6);
}

.bar-blue {
  background: linear-gradient(to right, #3b82f6, #06b6d4);
}

.bar-gold {
  background: linear-gradient(to right, #f59e0b, #facc15);
}

.bar-violet {
  background: linear-gradient(to right, #8b5cf6, #d946ef);
}

/* line clamp */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
