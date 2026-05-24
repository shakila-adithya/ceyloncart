<template>
  <div class="min-h-screen pt-24 pb-16 page-warm relative overflow-hidden">

    <div class="absolute top-0 left-0 right-0 h-64 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full"
        style="background:linear-gradient(135deg,rgba(236,72,153,.12) 0%,rgba(139,92,246,.10) 50%,rgba(59,130,246,.08) 100%)"></div>
    </div>
    <div class="absolute top-16 right-0 w-80 h-80 bg-violet-300/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-20 left-0 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-fade-up">
        <RouterLink to="/" class="hover:text-pink-500 transition-colors">Home</RouterLink>
        <span class="text-pink-400">›</span>
        <span class="text-gray-700 dark:text-gray-200 capitalize font-semibold">{{ slug?.replace(/-/g,' ') }}</span>
      </nav>

      <!-- Hero header -->
      <div class="rounded-3xl p-8 mb-8 animate-fade-up relative overflow-hidden" style="background:linear-gradient(135deg,rgba(236,72,153,.08) 0%,rgba(139,92,246,.10) 50%,rgba(59,130,246,.08) 100%);border:1px solid rgba(236,72,153,.1)">
        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10 font-black capitalize select-none hidden md:block">
          {{ slug?.replace(/-/g,' ') }}
        </div>
        <h1 class="text-4xl font-display font-bold text-gray-800 dark:text-white capitalize mb-2">
          {{ slug?.replace(/-/g,' ') }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          <span class="text-pink-500 font-bold text-lg">{{ total }}</span> products available in this category
        </p>
      </div>

      <!--Sub-category circular icons-->
      <div v-if="subCategories.length > 0" class="mb-10 animate-slide-down">
        <div class="flex justify-start sm:justify-center gap-8 overflow-x-auto pb-3 scrollbar-hide px-4">
          <button v-for="sub in subCategories" :key="sub.name"
            @click="activeFilter = sub.filter"
            class="flex flex-col items-center gap-3 flex-linear-0 group">
            <div :class="['w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 shadow-md',
              activeFilter === sub.filter
                ? 'bg-linear-to-br from-pink-300 to-violet-500 shadow-pink-500/40 shadow-lg scale-100'
                : 'bg-white dark:bg-gray-900 group-hover:bg-pink-50 dark:group-hover:bg-gray-800 group-hover:scale-105']">
              {{ sub.icon }}
            </div>
            <span :class="['text-xs font-semibold text-center whitespace-nowrap transition-colors',
              activeFilter === sub.filter ? 'text-pink-500' : 'text-gray-600 dark:text-gray-300 group-hover:text-pink-500']">
              {{ sub.name }}
            </span>
          </button>
        </div>
      </div>

      <!-- Brand filter pills -->
      <div class="flex gap-2 overflow-x-auto pb-2 mb-8 animate-slide-down scrollbar-hide" v-if="brandFilters.length > 1">
        <button v-for="brand in brandFilters" :key="brand" @click="activeBrand = brand"
          :class="['px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap border',
            activeBrand === brand
              ? 'bg-linear-to-r from-pink-500 to-violet-500 text-white border-transparent shadow-md'
              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-pink-300']">
          {{ brand }}
        </button>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <SkeletonCard v-for="i in 10" :key="i"/>
      </div>
      <div v-else-if="finalProducts.length === 0" class="text-center py-24">
        <div class="text-7xl mb-5 animate-float inline-block">📭</div>
        <h3 class="text-xl font-display font-bold text-gray-700 dark:text-gray-200 mb-2">No products found</h3>
        <button @click="activeFilter='All';activeBrand='All Brands'"
          class="mt-4 px-6 py-3 bg-linear-to-r from-pink-500 to-violet-500 text-white rounded-full text-sm font-bold hover:shadow-lg transition-all">
          Show All
        </button>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div v-for="(p, i) in finalProducts" :key="p.id"
          class="reveal-scale show" :style="{transitionDelay:(i%10*40)+'ms'}">
          <ProductCard :product="p"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const { products, loading, total, fetchProducts } = useProducts()
const slug = computed(() => route.params.slug as string)
const activeFilter = ref('All')
const activeBrand = ref('All Brands')

// Sub-categories
const subCategoryMap: Record<string, Array<{name:string;icon:string;filter:string}>> = {
  beauty:             [{name:'All',icon:'💄',filter:'All'},{name:'Perfumes',icon:'🌹',filter:'Perfumes'},{name:'Face Care',icon:'👩',filter:'Face'},{name:'Hair',icon:'💆',filter:'Hair'},{name:'Soap',icon:'🧼',filter:'Soap'},{name:'Skin Care',icon:'🧴',filter:'Skin'}],
  fragrances:         [{name:'All',icon:'🌸',filter:'All'},{name:'Floral',icon:'💐',filter:'Floral'},{name:'Woody',icon:'🌲',filter:'Woody'},{name:'Fresh',icon:'🍃',filter:'Fresh'},{name:'Oriental',icon:'✨',filter:'Oriental'}],
  'skin-care':        [{name:'All',icon:'✨',filter:'All'},{name:'Moisturizer',icon:'💧',filter:'Moisturizer'},{name:'Serum',icon:'🧪',filter:'Serum'},{name:'Sunscreen',icon:'☀️',filter:'Sunscreen'},{name:'Mask',icon:'🎭',filter:'Mask'}],
  smartphones:        [{name:'All',icon:'📱',filter:'All'},{name:'iPhone',icon:'🍎',filter:'iPhone'},{name:'Samsung',icon:'🌀',filter:'Samsung'},{name:'Budget',icon:'💰',filter:'Budget'},{name:'Flagship',icon:'⭐',filter:'Flagship'}],
  laptops:            [{name:'All',icon:'💻',filter:'All'},{name:'Gaming',icon:'🎮',filter:'Gaming'},{name:'Business',icon:'💼',filter:'Business'},{name:'Student',icon:'📚',filter:'Student'},{name:'Ultra-thin',icon:'🪶',filter:'Ultra'}],
  'mens-watches':     [{name:'All',icon:'⌚',filter:'All'},{name:'Luxury',icon:'💎',filter:'Luxury'},{name:'Sport',icon:'🏃',filter:'Sport'},{name:'Casual',icon:'😎',filter:'Casual'},{name:'Smart',icon:'📡',filter:'Smart'}],
  'womens-jewellery': [{name:'All',icon:'💍',filter:'All'},{name:'Rings',icon:'💍',filter:'Ring'},{name:'Necklace',icon:'📿',filter:'Necklace'},{name:'Earrings',icon:'🌙',filter:'Earring'},{name:'Bracelet',icon:'⛓️',filter:'Bracelet'}],
  furniture:          [{name:'All',icon:'🛋️',filter:'All'},{name:'Living Room',icon:'🛋️',filter:'Sofa'},{name:'Bedroom',icon:'🛏️',filter:'Bed'},{name:'Office',icon:'🪑',filter:'Chair'},{name:'Storage',icon:'🗄️',filter:'Storage'}],
  groceries:          [{name:'All',icon:'🛒',filter:'All'},{name:'Fresh',icon:'🥦',filter:'Fresh'},{name:'Snacks',icon:'🍫',filter:'Snack'},{name:'Drinks',icon:'🥤',filter:'Drink'},{name:'Organic',icon:'🌿',filter:'Organic'}],
}

const subCategories = computed(() => subCategoryMap[slug.value] || [])

const brandFilters = computed(() => {
  const brands = [...new Set(products.value.map(p => p.brand).filter(Boolean))]
  return ['All Brands', ...brands.slice(0, 8)]
})

const finalProducts = computed(() => {
  let list = [...products.value]
  if (activeFilter.value !== 'All') {
    list = list.filter(p =>
      p.title.toLowerCase().includes(activeFilter.value.toLowerCase()) ||
      p.description.toLowerCase().includes(activeFilter.value.toLowerCase()) ||
      (p.tags || []).some((t:string) => t.toLowerCase().includes(activeFilter.value.toLowerCase()))
    )
  }
  if (activeBrand.value !== 'All Brands') {
    list = list.filter(p => p.brand === activeBrand.value)
  }
  return list
})

async function load() {
  activeFilter.value = 'All'
  activeBrand.value = 'All Brands'
  await fetchProducts(40, 0, slug.value)
}

onMounted(load)
watch(slug, load)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>