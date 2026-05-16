<template>
  <div class="min-h-screen transition-colors duration-300">
    <NavBar />
    <div class="pt-[65px] max-w-[1400px] mx-auto">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

</script>
