<template>
  <header class="bg-white shadow-sm border-b border-slate-200">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          V
        </span>
        <span class="font-semibold text-slate-800">Vue_App</span>
      </RouterLink>

      <AppNavigation />

      <div class="flex items-center gap-3">
        <span v-if="auth.isAuthenticated.value" class="text-sm text-slate-600">
          {{ auth.email.value }}
        </span>

        <button
            v-if="auth.isAuthenticated.value"
            class="px-3 py-1.5 rounded-lg bg-slate-100 text-sm hover:bg-slate-200"
            @click="auth.logout()"
        >
          Logout
        </button>

        <RouterLink
            v-else
            to="/login"
            class="px-3 py-1.5 rounded-lg bg-blue-600 text-sm text-white hover:bg-blue-700"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppNavigation from './AppNavigation.vue'
import { useAuthStore } from '@/composables/useAuth'

const auth = useAuthStore()
</script>
