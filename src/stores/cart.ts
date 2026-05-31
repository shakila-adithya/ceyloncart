import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '../types/Product'

function loadCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem('ceyloncart_cart') || '[]') }
  catch { return [] }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())
  const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((s, i) => s + i.product.price * i.quantity, 0))

  function save() { localStorage.setItem('ceyloncart_cart', JSON.stringify(items.value)) }

  function addItem(product: Product, qty = 1) {
    const ex = items.value.find(i => i.product.id === product.id)
    if (ex) ex.quantity += qty
    else items.value.push({ product, quantity: qty })
    save()
  }
  function removeItem(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId); save()
  }
  function updateQty(productId: number, qty: number) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) { if (qty <= 0) removeItem(productId); else item.quantity = qty }
    save()
  }
  function clearCart() { items.value = []; save() }

  return { items, totalItems, totalPrice, addItem, removeItem, updateQty, clearCart }
})
