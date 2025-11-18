<template>
  <section class="space-y-4" v-if="user">
    <button
        class="px-3 py-1.5 rounded-lg bg-slate-100 text-sm hover:bg-slate-200"
        @click="$router.back()"
    >
      ← Назад
    </button>

    <div class="flex items-center gap-4">
      <img
          :src="user.avatar"
          :alt="user.fullName"
          class="h-16 w-16 rounded-full object-cover"
      />
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">
          {{ user.fullName }}
        </h1>
        <p class="text-sm text-slate-600">{{ user.email }}</p>
      </div>
    </div>

    <p class="text-sm text-slate-600">
      <code class="px-1 bg-slate-100 rounded">/Users/{{ id }}</code>.
      Дані завантажуються через UsersRepository.getById().
    </p>
  </section>

  <p v-else-if="loading" class="text-sm text-slate-500">Завантаження...</p>
  <p v-else class="text-sm text-red-500">Користувача не знайдено</p>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { UsersRepository } from '@/repositories/UsersRepository'
import type { User } from '@/types/user'

const route = useRoute()
const id = ref<number>(Number(route.params.id))

const user = ref<User | null>(null)
const loading = ref(false)

async function load() {
  if (!id.value) return
  loading.value = true
  try {
    user.value = await UsersRepository.getById(id.value)
  } catch {
    user.value = null
  } finally {
    loading.value = false
  }
}

onMounted(load)

watch(
    () => route.params.id,
    newVal => {
      id.value = Number(newVal)
      load()
    }
)
</script>
