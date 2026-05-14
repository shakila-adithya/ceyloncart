<script setup lang="ts">
defineProps<{
  categories: string[];
  modelValue: string;
}>();

defineEmits<{ "update:modelValue": [value: string] }>();

function formatLabel(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
</script>

<template>
  <div class="w-full overflow-x-auto pb-2">
    <div class="flex flex-row gap-2 min-w-max">

      <!-- All -->
      <button
        @click="$emit('update:modelValue', '')"
        :style="modelValue === ''
          ? 'background:#ec4899;color:#fff;border:2px solid #ec4899;'
          : 'background:#fff;color:#4b5563;border:2px solid #9ca3af;'"
        style="padding:6px 16px;border-radius:9999px;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer;transition:all 0.15s;"
      >
        All
      </button>

      <!-- Categories -->
      <button
        v-for="cat in categories"
        :key="cat"
        @click="$emit('update:modelValue', cat)"
        :style="modelValue === cat
          ? 'background:#ec4899;color:#fff;border:2px solid #ec4899;'
          : 'background:#fff;color:#4b5563;border:2px solid #9ca3af;'"
        style="padding:6px 16px;border-radius:9999px;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer;transition:all 0.15s;text-transform:capitalize;"
      >
        {{ formatLabel(cat) }}
      </button>

    </div>
  </div>
</template>