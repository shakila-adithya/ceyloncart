import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

document.documentElement.classList.toggle(
  'dark',
  localStorage.getItem('ceyloncart_dark') === '1',
)

createApp(App).use(createPinia()).use(router).mount('#app')
