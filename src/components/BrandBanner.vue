<template>
  <section class="px-4 max-w-[91.25rem] h-full mx-auto sm:px-8 lg:px-8 py-6">
    <div class="max-w-[91.25rem] mx-auto space-y-4">

      <!-- Auto-sliding promo banner-->
      <div class="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group h-[clamp(200px,32vw,320px)]"
        @click="$router.push(slides[cur].link)">

        <!-- All slides rendered, only active is visible-->
        <div v-for="(sl,i) in slides" :key="sl.id"
          class="absolute inset-0 transition-opacity duration-700"
          :style="{opacity: cur===i ? 1 : 0, zIndex: cur===i ? 1 : 0}">
          <img :src="sl.img" :alt="sl.title"
            class="absolute inset-0 w-full h-full object-cover"
            :class="cur===i ? 'scale-105' : 'scale-100'"
            style="transition:transform 7s ease"
            loading="eager"/>
          <div class="absolute inset-0"
            style="background:linear-gradient(90deg,rgba(15,5,30,.88) 0%,rgba(15,5,30,.55) 45%,transparent 100%)"></div>
          <div class="absolute inset-0 flex flex-col justify-center px-5 sm:px-10 md:px-14">
            <span class="inline-block self-start mb-3 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style="background:linear-gradient(to right,#ec4899,#8b5cf6);color:white">{{ sl.tag }}</span>
            <h2 class="text-white font-black leading-tight mb-2 drop-shadow-lg"
              style="font-size:clamp(1.3rem,3.5vw,2.4rem)">{{ sl.title }}</h2>
            <p class="text-white/75 text-sm mb-5 max-w-md">{{ sl.sub }}</p>
            <div class="flex flex-col sm:flex-row gap-3 sm:flex-wrap sm:items-center">
              <button class="w-full sm:w-auto px-5 py-2 rounded-full font-black text-sm transition-all active:scale-95 hover:scale-105"
                style="background:white;color:#ec4899">Shop Now →</button>
              <span v-if="sl.price" class="w-full sm:w-auto px-4 py-2 rounded-full text-white text-sm font-bold text-center"
                style="background:rgba(139,92,246,.65);backdrop-filter:blur(6px)">{{ sl.price }}</span>
            </div>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          <button v-for="(_,i) in slides" :key="i" @click.stop="cur=i"
            :class="['rounded-full transition-all duration-300',
              cur===i ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80']"/>
        </div>

        <!-- Arrows -->
        <button @click.stop="prev"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-black/50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button @click.stop="next"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-black/50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Brand logos-->
      <div class="rounded-2xl px-6 py-4 border reveal" :ref="el=>reg(el)"
        style="background:linear-gradient(135deg,rgba(236,72,153,.04) 0%,rgba(139,92,246,.06) 100%);border-color:rgba(236,72,153,.12)">
        <p class="text-[10px] text-gray-400 dark:text-gray-500 text-center mb-3 font-bold uppercase tracking-[.2em]">Trusted Brands</p>
        <div class="flex items-center justify-around flex-wrap gap-3">
          <div v-for="b in brands" :key="b.name"
            class="opacity-40 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-default select-none">
            <span :class="b.cls">{{ b.name }}</span>
          </div>
        </div>
      </div>

      <!-- Payment info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal" :ref="el=>reg(el)">
        <div v-for="p in payInfo" :key="p.label"
          class="flex items-center gap-3 rounded-2xl p-3 border transition-all hover:scale-105"
          style="background:linear-gradient(135deg,rgba(236,72,153,.05) 0%,rgba(139,92,246,.07) 100%);border-color:rgba(139,92,246,.15)">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
            style="background:linear-gradient(135deg,rgba(236,72,153,.15),rgba(139,92,246,.15))">{{ p.icon }}</div>
          <div class="min-w-0">
            <p class="text-xs font-bold text-gray-800 dark:text-gray-600 truncate">{{ p.label }}</p>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">{{ p.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const cur = ref(0)
let auto: ReturnType<typeof setInterval>

const slides = [
  { id:1, img:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&h=500&fit=crop&auto=format&q=80', tag:'CeylonCart Exclusive', title:'Own the Sound\nOwn the Moment', sub:'Premium speakers — Sony, Bose, JBL & more', price:'From LKR 15,490', link:'/products' },
  { id:2, img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop&auto=format&q=80', tag:'Summer Collection', title:'Fresh Styles\nFor Every Occasion', sub:'New fashion arrivals with up to 40% off', price:'From LKR 999', link:'/products' },
  { id:3, img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&h=500&fit=crop&auto=format&q=80', tag:'Flash Sale', title:'Mega Sale on Footwear', sub:'Top brands at unbeatable prices — today only!', price:'Up to 50% OFF', link:'/products' },
]

const brands = [
  {name:'SONY',      cls:'text-base font-black tracking-tight text-gray-700 dark:text-gray-600'},
  {name:'Samsung',   cls:'text-base font-black text-blue-600 dark:text-blue-700'},
  {name:'Apple',     cls:'text-base font-black text-gray-700 dark:text-gray-600'},
  {name:'BOSE',      cls:'text-base font-black tracking-widest text-gray-700 dark:text-gray-600'},
  {name:'Nike',      cls:'text-base font-black italic text-gray-700 dark:text-gray-600'},
  {name:'Gucci',     cls:'text-base font-black tracking-wide text-gray-700 dark:text-gray-600'},
  {name:'LG',        cls:'text-lg font-black text-red-600 dark:text-red-700'},
  {name:'Panasonic', cls:'text-sm font-black text-blue-700 dark:text-blue-700'},
]

const payInfo = [
  {icon:'💳', label:'0% Interest Plans', sub:'Up to 24 months'},
  {icon:'🏦', label:'All Major Banks',   sub:'Visa · Master · Amex'},
  {icon:'🔒', label:'Secure Payment',    sub:'256-bit SSL encryption'},
  {icon:'🚚', label:'Free Delivery',     sub:'Orders over LKR 5,000'},
]

const next = () => { cur.value = (cur.value+1) % slides.length }
const prev = () => { cur.value = (cur.value-1+slides.length) % slides.length }

let io: IntersectionObserver
function reg(el:any){ if(!el||!io)return; const n=(el as any).$el??el; if(n instanceof Element)io.observe(n) }

onMounted(()=>{
  io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)} })
  },{threshold:.08})
  auto = setInterval(next,5000)
})
onUnmounted(()=>clearInterval(auto))

</script>
