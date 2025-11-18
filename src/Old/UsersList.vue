<template>
  <section class="wrapper">
    <header class="toolbar flex flex-wrap items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white shadow-sm">
      <strong class="text-gray-700">Filter:</strong>

      <button
          class="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
          :class="{
          'bg-slate-200 border-slate-300 text-slate-800': genderFilter === 'all',
          'bg-blue-100 border-blue-300 text-blue-700': genderFilter === 'male',
          'bg-pink-100 border-pink-300 text-pink-700': genderFilter === 'female'
        }"
          @click="genderFilter = 'all'"
      >all</button>

      <button
          class="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
          :class="{
          'bg-slate-200 border-slate-300 text-slate-800': genderFilter === 'male',
          'bg-blue-100 border-blue-300 text-blue-700': genderFilter === 'male'
        }"
          @click="genderFilter = 'male'"
      >male</button>

      <button
          class="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
          :class="{
          'bg-slate-200 border-slate-300 text-slate-800': genderFilter === 'female',
          'bg-pink-100 border-pink-300 text-pink-700': genderFilter === 'female'
        }"
          @click="genderFilter = 'female'"
      >female</button>

      <span class="ml-auto text-xs text-gray-500">Shown: {{ filtered.length }}/{{ users.length }}</span>
    </header>

    <p v-if="filtered.length === 0" class="p-6 border border-dashed rounded-xl bg-white text-gray-600 text-center mt-4">
      Список юзерів пустий
    </p>

    <div
        v-else
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 items-start place-items-center"
    >
      <UserCard
          v-for="u in filtered"
          :key="u.id"
          :user="u"
          class="transition-transform hover:scale-[1.03] duration-300"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User, Gender } from '../types'
import UserCard from './UserCard.vue'

const photo = (seed: string) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`

const users = ref<User[]>([
  { id: 1, firstName: 'Oleh', lastName: 'Hrytsenko', gender: 'male', age: 19, position: 'Intern Frontend', photo: photo('oleh'), hobbies: ['gaming', 'js', 'gym'] },
  { id: 2, firstName: 'Iryna', lastName: 'Melnyk', gender: 'female', age: 23, position: 'QA Engineer', photo: photo('iryna'), hobbies: ['reading', 'gym', 'yoga'] },
  { id: 3, firstName: 'Dmytro', lastName: 'Shevchenko', gender: 'male', age: 28, position: 'DevOps', photo: photo('dmytro'), hobbies: ['linux', 'docker', 'bikes'] },
  { id: 4, firstName: 'Olena', lastName: 'Horoshko', gender: 'female', age: 18, position: 'Student', photo: photo('olena'), hobbies: ['music', 'sketching'] },
  { id: 5, firstName: 'Vlad', lastName: 'Krutyi', gender: 'male', age: 21, position: 'Backend (Python)', photo: photo('vlad'), hobbies: ['flask', 'mongo', 'football'] },
  { id: 6, firstName: 'Sofiia', lastName: 'Bondar', gender: 'female', age: 26, position: 'PM', photo: photo('sofiia'), hobbies: ['kanban', 'travel', 'books'] },
  { id: 7, firstName: 'Andrii', lastName: 'Lysenko', gender: 'male', age: 20, position: 'Data Analyst', photo: photo('andrii'), hobbies: ['sql', 'pandas', 'chess'] },
  { id: 8, firstName: 'Kateryna', lastName: 'Savchuk', gender: 'female', age: 22, position: 'UI/UX', photo: photo('kateryna'), hobbies: ['figma', 'dribbble', 'coffee'] },
  { id: 9, firstName: 'Mykola', lastName: 'Bond', gender: 'male', age: 30, position: 'Full-stack', photo: photo('mykola'), hobbies: ['node', 'vue', 'mtb'] },
  { id: 10, firstName: 'Natalia', lastName: 'Ruda', gender: 'female', age: 24, position: 'Marketing', photo: photo('natalia'), hobbies: ['seo', 'blogging', 'photo'] }
])

const genderFilter = ref<'all' | Gender>('all')

const filtered = computed(() => {
  if (genderFilter.value === 'all') return users.value
  return users.value.filter(u => u.gender === genderFilter.value)
})
</script>
