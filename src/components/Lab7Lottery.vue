<template>
  <section class="space-y-6">
    <p class="text-slate-600">
      Розбиття на компоненти, localStorage, пошук, сортування, редагування та видалення.
    </p>

    <RegisterForm
        :external-error="createError"
        @create="handleCreate"
    />

    <div class="flex items-center justify-between mt-4">
      <SearchBar @filter-by-name="setSearch" />
      <div class="text-sm text-slate-500">
        Учасників: {{ participants.length }}
      </div>
    </div>

    <ParticipantsTable
        :items="filteredSorted"
        @sort="toggleSort"
        @edit="openEdit"
        @delete="confirmDelete"
    />

    <!-- Edit -->
    <Modal :open="editing !== null" @close="editing = null">
      <template #title>Редагувати учасника</template>

      <BaseInput label="Імʼя" v-model="editForm.name" />
      <BaseInput label="Група" v-model="editForm.group" />
      <BaseInput label="Email" type="email" v-model="editForm.email" />
      <BaseInput label="GitHub" v-model="editForm.github" />
      <BaseInput label="Дата народження" type="date" v-model="editForm.dob" />

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">
          Рівень
        </label>
        <select
            v-model="editForm.level"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <template #footer>
        <BaseButton
            type="button"
            class="!bg-slate-200 !text-slate-800 hover:!bg-slate-300"
            @click="editing = null"
        >
          Скасувати
        </BaseButton>
        <BaseButton type="button" @click="applyEdit">
          Оновити дані
        </BaseButton>
      </template>

      <p v-if="editError" class="text-sm text-red-500 mt-2">
        {{ editError }}
      </p>
    </Modal>

    <!-- Delete -->
    <Modal :open="deleting !== null" @close="deleting = null">
      <template #title>Видалення учасника</template>

      <p class="text-slate-700">
        Ви дійсно бажаєте видалити учасника
        <strong>{{ deleting?.name }}</strong>
        (<span class="font-mono">{{ deleting?.email }}</span>)?
      </p>

      <template #footer>
        <BaseButton
            type="button"
            class="!bg-slate-200 !text-slate-800 hover:!bg-slate-300"
            @click="deleting = null"
        >
          Ні
        </BaseButton>
        <BaseButton
            type="button"
            class="!bg-red-500 hover:!bg-red-600"
            @click="doDelete"
        >
          Так
        </BaseButton>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useParticipants } from '../composables/useParticipants';
import type { Participant, Level } from '../types';

import RegisterForm from './registration/RegisterForm.vue';
import SearchBar from './common/SearchBar.vue';
import ParticipantsTable from './participants/ParticipantsTable.vue';
import Modal from './common/Modal.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';

const {
  participants,
  filteredSorted,
  setSearch,
  toggleSort,
  addParticipant,
  updateParticipant,
  removeParticipant
} = useParticipants();

const createError = ref('');
const editing = ref<Participant | null>(null);
const deleting = ref<Participant | null>(null);

const editForm = reactive({
  name: '',
  group: '',
  email: '',
  github: '',
  dob: '',
  level: 'Junior' as Level
});
const editError = ref('');

function handleCreate(payload: {
  name: string;
  group: string;
  email: string;
  github?: string;
  dob: string;
  level: Level;
}) {
  createError.value = '';
  try {
    addParticipant(payload);
  } catch (e) {
    if (e instanceof Error) {
      createError.value = e.message;
    }
  }
}

function openEdit(p: Participant) {
  editing.value = p;
  editForm.name = p.name;
  editForm.group = p.group;
  editForm.email = p.email;
  editForm.github = p.github ?? '';
  editForm.dob = p.dob;
  editForm.level = p.level;
  editError.value = '';
}

function applyEdit() {
  if (!editing.value) return;

  if (!editForm.name.trim() || !editForm.group.trim() || !editForm.email.trim()) {
    editError.value = 'Заповніть усі обовʼязкові поля.';
    return;
  }

  updateParticipant(editing.value.id, {
    name: editForm.name.trim(),
    group: editForm.group.trim(),
    email: editForm.email.trim(),
    github: editForm.github.trim() || undefined,
    dob: editForm.dob,
    level: editForm.level
  });

  editing.value = null;
}

function confirmDelete(p: Participant) {
  deleting.value = p;
}

function doDelete() {
  if (!deleting.value) return;
  removeParticipant(deleting.value.id);
  deleting.value = null;
}
</script>
