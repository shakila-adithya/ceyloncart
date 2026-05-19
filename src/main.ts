import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

document.documentElement.classList.toggle(
  'dark',
  localStorage.getItem('ceyloncart_dark') === '1',
)

createApp(App).use(router).mount('#app')
