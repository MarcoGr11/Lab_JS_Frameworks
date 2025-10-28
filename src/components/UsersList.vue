<template>
  <section class="wrapper">
    <header class="toolbar">
      <strong>Filter:</strong>
      <button
          class="btn"
          :class="{ active: genderFilter === 'all' }"
          @click="genderFilter = 'all'"
      >all</button>
      <button
          class="btn"
          :class="{ active: genderFilter === 'male' }"
          @click="genderFilter = 'male'"
      >male</button>
      <button
          class="btn"
          :class="{ active: genderFilter === 'female' }"
          @click="genderFilter = 'female'"
      >female</button>
      <span class="count">Shown: {{ filtered.length }}/{{ users.length }}</span>
    </header>

    <p v-if="filtered.length === 0" class="empty">Список юзерів пустий</p>

    <div v-else class="grid">
      <UserCard v-for="u in filtered" :key="u.id" :user="u" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User, Gender } from '@/types'
import UserCard from './UserCard.vue'

const photo = (seed: string) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`

const users = ref<User[]>([
  { id: 1, firstName: 'Oleh', lastName: 'Hrytsenko', gender: 'male', age: 19, position: 'Intern Frontend', photo: photo('oleh'), hobbies: ['gaming','js','gym'] },
  { id: 2, firstName: 'Iryna', lastName: 'Melnyk', gender: 'female', age: 23, position: 'QA Engineer', photo: photo('iryna'), hobbies: ['reading','gym','yoga'] },
  { id: 3, firstName: 'Dmytro', lastName: 'Shevchenko', gender: 'male', age: 28, position: 'DevOps', photo: photo('dmytro'), hobbies: ['linux','docker','bikes'] },
  { id: 4, firstName: 'Olena', lastName: 'Horoshko', gender: 'female', age: 17, position: 'Student', photo: photo('olena'), hobbies: ['music','sketching'] },
  { id: 5, firstName: 'Vlad', lastName: 'Krutyi', gender: 'male', age: 21, position: 'Backend (Python)', photo: photo('vlad'), hobbies: ['flask','mongo','football'] },
  { id: 6, firstName: 'Sofiia', lastName: 'Bondar', gender: 'female', age: 26, position: 'PM', photo: photo('sofiia'), hobbies: ['kanban','travel','books'] },
  { id: 7, firstName: 'Andrii', lastName: 'Lysenko', gender: 'male', age: 20, position: 'Data Analyst', photo: photo('andrii'), hobbies: ['sql','pandas','chess'] },
  { id: 8, firstName: 'Kateryna', lastName: 'Savchuk', gender: 'female', age: 22, position: 'UI/UX', photo: photo('kateryna'), hobbies: ['figma','dribbble','coffee'] },
  { id: 9, firstName: 'Mykola', lastName: 'Bond', gender: 'male', age: 30, position: 'Full-stack', photo: photo('mykola'), hobbies: ['node','vue','mtb'] },
  { id: 10, firstName: 'Natalia', lastName: 'Ruda', gender: 'female', age: 24, position: 'Marketing', photo: photo('natalia'), hobbies: ['seo','blogging','photo'] },
])

const genderFilter = ref<'all' | Gender>('all')

const filtered = computed(() => {
  if (genderFilter.value === 'all') return users.value
  return users.value.filter(u => u.gender === genderFilter.value)
})
</script>

<style scoped>
.wrapper { display: grid; gap: 16px; }
.toolbar {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fff;
}
.btn {
  padding: 6px 10px; border-radius: 999px; border: 1px solid #e5e7eb; background: #f8fafc; cursor: pointer;
}
.btn.active { background: #dbeafe; border-color: #93c5fd; }
.count { margin-left: auto; color: #475569; font-size: 12px; }
.grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
.empty { padding: 16px; border-radius: 12px; background: #fff; border: 1px dashed #94a3b8; color: #334155; }
</style>
