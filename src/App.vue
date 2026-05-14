<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen transition-colors duration-300"></div>
  <NavBar />
  <main class="pt-16">
  <RouterView />
  </main>
</template>