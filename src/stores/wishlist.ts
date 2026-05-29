import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/Product'

function loadWishlist(): Product[] {
  try { return JSON.parse(localStorage.getItem('ceyloncart_wishlist') || '[]') }
  catch { return [] }
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>(loadWishlist())
  const total = computed(() => items.value.length)

  function save() { localStorage.setItem('ceyloncart_wishlist', JSON.stringify(items.value)) }
  function toggle(product: Product) {
    const idx = items.value.findIndex(p => p.id === product.id)
    if (idx >= 0) items.value.splice(idx, 1)
    else items.value.push(product)
    save()
  }
  function isWishlisted(id: number) { return items.value.some(p => p.id === id) }

  return { items, total, toggle, isWishlisted }
})
