<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <div class="relative w-full">
    <span class="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
    </span>
    <input
      type="text"
      placeholder="Search products…"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm
             focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent
             placeholder-gray-400 transition"
    />
  </div>
</template>
