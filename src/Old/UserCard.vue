<template>
  <article
      class="w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col justify-start"
  >
    <div class="flex items-center gap-3 mb-2">
      <img :src="user.photo" alt="avatar" class="w-14 h-14 rounded-full border" />
      <div>
        <h3 class="font-semibold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h3>
        <p class="text-gray-500 text-sm flex items-center gap-1">
          <span class="px-2 py-0.5 text-xs rounded-full bg-slate-100 border border-slate-200">{{ user.gender }}</span>
          •
          <span>{{ user.position }}</span>
        </p>
      </div>
    </div>

    <p class="text-sm text-gray-700 mb-1">Age: {{ user.age }}</p>

    <div class="text-sm text-gray-700">
      <p class="font-medium text-gray-800">Hobbies</p>
      <ul class="list-disc list-inside text-gray-600">
        <li v-for="(hobby, i) in user.hobbies" :key="i">{{ hobby }}</li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { User } from '../types'
defineProps<{ user: User }>()
</script>
