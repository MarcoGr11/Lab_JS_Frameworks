<template>
  <button
      :type="type"
      :class="[
      'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-1',
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      variant === 'outline' && 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-blue-500',
      variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline' | 'danger';
}>();

const type = props.type ?? 'button';
const variant = props.variant ?? 'primary';
</script>
