<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-semibold text-slate-800">Users</h1>

    <div v-if="loading" class="text-slate-500">Loading...</div>

    <table v-else class="min-w-full text-sm border rounded-xl overflow-hidden">
      <thead class="bg-slate-100 text-slate-600">
      <tr>
        <th class="px-3 py-2 text-left">ID</th>
        <th class="px-3 py-2 text-left">Full name</th>
        <th class="px-3 py-2 text-left">Email</th>
        <th class="px-3 py-2 text-left">Details</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="u in users"
          :key="u.id"
          class="border-b last:border-b-0"
      >
        <td class="px-3 py-2">{{ u.id }}</td>
        <td class="px-3 py-2">{{ u.fullName }}</td>
        <td class="px-3 py-2">{{ u.email }}</td>
        <td class="px-3 py-2">
          <RouterLink
              :to="`/users/${u.id}`"
              class="text-blue-600 hover:underline"
          >
            View
          </RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UsersRepository } from '@/repositories/UsersRepository'
import { RouterLink } from 'vue-router'
import type { User } from '@/types/user'

const users = ref<User[]>([])
const loading = ref(true)

onMounted(async () => {
  users.value = await UsersRepository.list()
  loading.value = false
})
</script>
