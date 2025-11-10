<template>
  <div class="border border-slate-200 rounded-xl overflow-hidden">
    <table class="min-w-full divide-y divide-slate-200 text-sm">
      <thead class="bg-slate-50">
      <tr>
        <th class="px-3 py-2 w-10 text-left text-slate-500">#</th>
        <th class="px-3 py-2 text-left text-slate-500">
          <button
              type="button"
              class="inline-flex items-center gap-1"
              @click="$emit('sort', 'name')"
          >
            Імʼя <span class="text-xs">⇅</span>
          </button>
        </th>
        <th class="px-3 py-2 text-left text-slate-500">Група</th>
        <th class="px-3 py-2 text-left text-slate-500">Email</th>
        <th class="px-3 py-2 text-left text-slate-500">
          <button
              type="button"
              class="inline-flex items-center gap-1"
              @click="$emit('sort', 'dob')"
          >
            Дата народж. <span class="text-xs">⇅</span>
          </button>
        </th>
        <th class="px-3 py-2 text-left text-slate-500">Рівень</th>
        <th class="px-3 py-2 text-left text-slate-500">GitHub</th>
        <th class="px-3 py-2 text-right text-slate-500 w-40">Дії</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="(p, index) in items"
          :key="p.id"
          class="even:bg-slate-50/40"
      >
        <td class="px-3 py-2">{{ index + 1 }}</td>
        <td class="px-3 py-2">{{ p.name }}</td>
        <td class="px-3 py-2">{{ p.group }}</td>
        <td class="px-3 py-2">{{ p.email }}</td>
        <td class="px-3 py-2">{{ p.dob }}</td>
        <td class="px-3 py-2">{{ p.level }}</td>
        <td class="px-3 py-2">
          <a
              v-if="p.github"
              :href="p.github"
              class="text-blue-600 hover:underline"
              target="_blank"
          >
            {{ p.github }}
          </a>
          <span v-else>—</span>
        </td>
        <td class="px-3 py-2 text-right">
          <div class="flex justify-end gap-2">
            <BaseButton
                variant="outline"
                class="w-28 h-9 flex items-center justify-center"
                @click="$emit('edit', p)"
            >
              ✏️ Редагувати
            </BaseButton>

            <BaseButton
                variant="danger"
                class="w-28 h-9 flex items-center justify-center"
                @click="$emit('delete', p)"
            >
              🗑 Видалити
            </BaseButton>
          </div>
        </td>
      </tr>

      <tr v-if="!items.length">
        <td class="px-3 py-3 text-center text-slate-400" colspan="8">
          Немає учасників
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import type { Participant } from '../../types';

defineProps<{
  items: Participant[];
}>();

defineEmits<{
  sort: ['name' | 'dob'];
  edit: [Participant];
  delete: [Participant];
}>();
</script>
