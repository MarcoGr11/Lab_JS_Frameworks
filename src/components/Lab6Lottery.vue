<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
    <!-- Форма реєстрації -->
    <form
        class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end"
        @submit.prevent="handleAdd"
    >
      <div class="space-y-1">
        <label class="text-sm text-slate-600">Ім'я та прізвище</label>
        <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Напр. Oleh Hrytsenko"
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm text-slate-600">Група</label>
        <input
            v-model="group"
            type="text"
            required
            class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="КН-11, ІПЗ-21 ..."
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm text-slate-600">Email</label>
        <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="student@example.com"
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm text-slate-600">Рівень</label>
        <select
            v-model="level"
            class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="junior">junior</option>
          <option value="middle">middle</option>
          <option value="senior">senior</option>
        </select>
      </div>

      <div class="space-y-1">
        <label class="text-sm text-slate-600">GitHub (необов'язково)</label>
        <input
            v-model="github"
            type="text"
            class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="github.com/username"
        />
      </div>

      <div class="space-y-1">
        <button
            type="submit"
            class="w-full md:w-auto px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Додати учасника
        </button>
        <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
      </div>
    </form>

    <!-- Фільтр + кількість -->
    <div class="flex flex-wrap items-center gap-3 justify-between border-t pt-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-slate-600">Фільтр за групою:</span>
        <select
            v-model="groupFilter"
            class="px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
        >
          <option value="all">всі</option>
          <option
              v-for="g in uniqueGroups"
              :key="g"
              :value="g"
          >
            {{ g }}
          </option>
        </select>
      </div>

      <div class="text-sm text-slate-500">
        Учасників: <span class="font-semibold text-slate-800">{{ filteredParticipants.length }}</span>
      </div>
    </div>

    <!-- Таблиця учасників -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
        <tr class="bg-slate-100 text-slate-700">
          <th class="px-3 py-2 text-left">#</th>
          <th class="px-3 py-2 text-left">Ім'я</th>
          <th class="px-3 py-2 text-left">Група</th>
          <th class="px-3 py-2 text-left">Email</th>
          <th class="px-3 py-2 text-left">Рівень</th>
          <th class="px-3 py-2 text-left">GitHub</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(p, index) in filteredParticipants"
            :key="p.id"
            :class="[
              'border-b last:border-b-0',
              winnersIds.has(p.id)
                ? 'bg-green-50/80'
                : index % 2 === 0
                  ? 'bg-white'
                  : 'bg-slate-50/70'
            ]"
        >
          <td class="px-3 py-2">{{ index + 1 }}</td>
          <td class="px-3 py-2 font-medium text-slate-900">
            {{ p.name }}
          </td>
          <td class="px-3 py-2">{{ p.group }}</td>
          <td class="px-3 py-2">{{ p.email }}</td>
          <td class="px-3 py-2 capitalize">{{ p.level }}</td>
          <td class="px-3 py-2">
            <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noreferrer"
                class="text-blue-600 hover:underline"
            >
              {{ shortGithub(p.github) }}
            </a>
            <span v-else class="text-slate-400">—</span>
          </td>
        </tr>
        <tr v-if="filteredParticipants.length === 0">
          <td colspan="6" class="px-3 py-4 text-center text-slate-500">
            Немає учасників для цієї групи
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Блок вибору переможців -->
    <div class="flex flex-wrap items-center gap-3 border-t pt-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-slate-600">Кількість переможців:</span>
        <input
            v-model.number="winnersCount"
            type="number"
            min="1"
            :max="participants.length || 1"
            class="w-20 px-2 py-1.5 rounded-md border border-slate-300 text-sm"
        />
      </div>

      <button
          class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="participants.length === 0 || winnersCount < 1"
          @click="pickWinners"
      >
        Обрати переможців
      </button>

      <div v-if="winners.length" class="text-sm text-slate-700 flex flex-wrap gap-2">
        <span class="font-semibold">Переможці:</span>
        <span
            v-for="w in winners"
            :key="w.id"
            class="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs"
        >
          {{ w.name }} ({{ w.group }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Level = 'junior' | 'middle' | 'senior'

interface Participant {
  id: number
  name: string
  group: string
  email: string
  level: Level
  github?: string
}

const participants = ref<Participant[]>([
  {
    id: 1,
    name: 'Oleh Hrytsenko',
    group: 'KН-11',
    email: 'oleh@example.com',
    level: 'junior',
    github: 'https://github.com/oleh',
  },
  {
    id: 2,
    name: 'Iryna Melnyk',
    group: 'IPZ-21',
    email: 'iryna@example.com',
    level: 'middle',
  },
])

// form state
const name = ref('')
const group = ref('')
const email = ref('')
const level = ref<Level>('junior')
const github = ref('')
const error = ref('')

// filters & winners
const groupFilter = ref<'all' | string>('all')
const winnersCount = ref(1)
const winners = ref<Participant[]>([])
const winnersIds = computed(() => new Set(winners.value.map(w => w.id)))

const uniqueGroups = computed(() => {
  const set = new Set<string>()
  participants.value.forEach(p => set.add(p.group))
  return Array.from(set)
})

const filteredParticipants = computed(() => {
  if (groupFilter.value === 'all') return participants.value
  return participants.value.filter(p => p.group === groupFilter.value)
})

function handleAdd() {
  error.value = ''

  if (!name.value.trim() || !group.value.trim() || !email.value.trim()) {
    error.value = 'Заповни всі обовʼязкові поля.'
    return
  }

  const id = participants.value.length
      ? Math.max(...participants.value.map(p => p.id)) + 1
      : 1

  participants.value.push({
    id,
    name: name.value.trim(),
    group: group.value.trim(),
    email: email.value.trim(),
    level: level.value,
    github: github.value.trim() || undefined,
  })

  name.value = ''
  group.value = ''
  email.value = ''
  github.value = ''
  level.value = 'junior'
}

function pickWinners() {
  winners.value = []

  const count = Math.min(
      Math.max(1, winnersCount.value || 1),
      participants.value.length,
  )

  const pool = [...participants.value]
  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * pool.length)
    const [picked] = pool.splice(index, 1)
    if (picked) winners.value.push(picked)
  }
}

function shortGithub(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname + u.pathname
  } catch {
    return url
  }
}
</script>
