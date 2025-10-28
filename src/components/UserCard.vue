<template>
  <article class="card" :class="ageClass">
    <img class="avatar" :src="user.photo" :alt="fullName" />
    <div class="info">
      <h3 class="name">{{ fullName }}</h3>
      <p class="meta">
        <span class="badge">{{ user.gender }}</span>
        <span class="dot">•</span>
        <span class="position">{{ user.position }}</span>
      </p>

      <p v-if="user.age > 18" class="age">Age: {{ user.age }}</p>

      <div class="hobbies">
        <h4>Hobbies</h4>
        <ul>
          <li v-for="(h, i) in user.hobbies" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types'

const props = defineProps<{ user: User }>()
const fullName = `${props.user.firstName} ${props.user.lastName}`
const ageClass = computed(() => (props.user.age < 21 ? 'is-young' : 'is-adult'))
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
}
.card.is-young { border-color: #c7d2fe; background: #f8fafc; }
.card.is-adult { border-color: #bbf7d0; background: #f7fee7; }

.avatar {
  width: 96px; height: 96px; object-fit: cover; border-radius: 12px;
}

.info { display: grid; gap: 6px; }
.name { margin: 0; font-size: 18px; font-weight: 700; }
.meta { margin: 0; color: #475569; display: flex; align-items: center; gap: 8px; }
.badge { padding: 2px 8px; border-radius: 999px; background: #e2e8f0; font-size: 12px; }
.dot { opacity: .6; }
.position { font-weight: 500; }

.age { margin: 2px 0 0; color: #0f172a; }
.hobbies h4 { margin: 8px 0 4px; font-size: 14px; color: #334155; }
.hobbies ul { margin: 0; padding-left: 18px; }
</style>
