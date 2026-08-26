<template>
  <section class="px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
    <div class="max-w-350 mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 reveal" :ref="registerEl">
        <div>
          <p
            class="text-pink-500 font-bold text-xs mb-1 uppercase tracking-[.15em]"
          >
            Explore
          </p>
          <h2 class="text-2xl sm:text-3xl font-black text-gray-900">
            Featured Offers
          </h2>
        </div>
      </div>

      <!-- Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[190px] lg:auto-rows-[170px]"
      >
        <div
          v-for="(b, i) in banners"
          :key="b.id"
          :ref="registerEl"
          @click="$router.push(b.link)"
          class="banner-card group relative rounded-2xl overflow-hidden cursor-pointer reveal-scale"
          :class="[
            b.tall ? 'sm:row-span-2' : '',
            b.wide ? 'sm:col-span-2 lg:col-span-2' : ''
          ]"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <img
            :src="b.img"
            :alt="b.title"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            :style="{ objectPosition: b.position }"
          />

          <div class="absolute inset-0" :style="{ background: b.ov }"></div>

          <div class="absolute inset-0 flex flex-col justify-end p-4">
            <span
              v-if="b.badge"
              class="inline-block self-start mb-2 text-[11px] font-black uppercase px-2.5 py-1 rounded-full text-white"
              :style="{ background: b.badgeBg }"
            >
              {{ b.badge }}
            </span>

            <h3 class="text-white font-black text-base md:text-lg leading-tight">
              {{ b.title }}
            </h3>

            <p class="text-white/80 text-xs mt-1 mb-3">
              {{ b.sub }}
            </p>

            <span
              class="self-start flex items-center gap-1 bg-white/20 backdrop-blur border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full group-hover:bg-white/30 transition"
            >
              Shop Now

              <svg
                class="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue"
import { useRouter } from "vue-router"

const $router = useRouter()

const banners = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    title: "MOBILE PHONES",
    sub: "Latest smartphones at best prices",
    badge: "NEW ARRIVALS",
    badgeBg: "#8b5cf6",
    ov: "linear-gradient(to top,rgba(88,28,135,.88),rgba(88,28,135,.15),transparent)",
    link: "/category/smartphones",
    tall: true,
    position: "50% 48%",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    title: "WOMENS JEWELLERY",
    sub: "Elegant pieces for every occasion",
    badge: "HOT DEAL",
    badgeBg: "#ec4899",
    ov: "linear-gradient(to top,rgba(131,24,67,.9),transparent)",
    link: "/category/womens-jewellery",
    position: "50% 55%",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    title: "BEAUTY & SKINCARE",
    sub: "Glow-up with premium brands",
    badge: "TRENDING",
    badgeBg: "#f97316",
    ov: "linear-gradient(to top,rgba(157,23,77,.9),transparent)",
    link: "/category/beauty",
    position: "50% 48%",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    title: "HOME DECOR",
    sub: "Transform your living space",
    badge: "NEW IN",
    badgeBg: "#7c3aed",
    ov: "linear-gradient(to top,rgba(30,27,75,.9),transparent)",
    link: "/category/home-decoration",
    position: "50% 62%",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    title: "FOOTWEAR",
    sub: "Step in style with top brands",
    badge: "UP TO 50% OFF",
    badgeBg: "#db2777",
    ov: "linear-gradient(to top,rgba(40,10,10,.9),transparent)",
    link: "/category/mens-shoes",
    position: "50% 52%",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    title: "WATCHES",
    sub: "Luxury & sport watches",
    badge: "EXCLUSIVE",
    badgeBg: "#2563eb",
    ov: "linear-gradient(to top,rgba(30,58,138,.9),transparent)",
    link: "/category/mens-watches",
    position: "50% 56%",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    title: "LAPTOPS",
    sub: "Powerful machines for work & gaming",
    badge: "BEST PRICE",
    badgeBg: "#059669",
    ov: "linear-gradient(to top,rgba(6,78,59,.9),transparent)",
    link: "/category/laptops",
    wide: true,
    position: "50% 64%",
  },
]

const items: HTMLElement[] = []

function registerEl(el: any) {
  if (!el) return
  const node = el.$el ?? el

  if (node instanceof HTMLElement) {
    items.push(node)
  }
}

onMounted(async () => {
  await nextTick()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  items.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.banner-card {
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.banner-card img {
  height: 100%;
  max-width: none;
  object-fit: cover;
}

.banner-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(236, 72, 153, 0.18);
}

/* Animation */
.reveal,
.reveal-scale {
  opacity: 0;
  transition:
    all 0.8s ease,
    transform 0.8s ease;
}

.reveal {
  transform: translateY(30px);
}

.reveal-scale {
  transform: translateY(20px) scale(0.94);
}

.show {
  opacity: 1 !important;
  transform: none !important;
}
</style>
