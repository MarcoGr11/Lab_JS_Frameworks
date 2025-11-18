<template>
  <nav class="flex items-center gap-4 text-sm">
    <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="px-3 py-1.5 rounded-lg transition"
        active-class="bg-blue-50 text-blue-700 border border-blue-200"
        exact-active-class="bg-blue-200"
    >
      {{ link.label }}
    </RouterLink>

  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/lottery', label: 'Lottery' },
  { to: '/users', label: 'Users' },
]
</script>
