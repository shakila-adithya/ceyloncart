import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/products', name: 'products', component: () => import('../views/ProductsView.vue') },
    { path: '/product/:id', name: 'product', component: () => import('../views/ProductView.vue') },
    { path: '/category/:slug', name: 'category', component: () => import('../views/CategoryView.vue') },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
    { path: '/wishlist', name: 'wishlist', component: () => import('../views/WishlistView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router