<template>
  <form class="grid grid-cols-4 gap-4" @submit.prevent="onSubmit">
    <BaseInput label="Ім'я" v-model="form.name" required />
    <BaseInput label="Група" v-model="form.group" required />
    <BaseInput label="Email" type="email" v-model="form.email" required />
    <BaseInput label="GitHub" v-model="form.github" />

    <BaseInput
        label="Дата народження"
        type="date"
        v-model="form.dob"
        class="col-span-2"
        required
    />

    <div class="col-span-2">
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Рівень
      </label>
      <select
          v-model="form.level"
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="Junior">Junior</option>
        <option value="Middle">Middle</option>
        <option value="Senior">Senior</option>
      </select>
    </div>

    <div class="col-span-4 flex justify-end items-end">
      <BaseButton type="submit">Додати учасника</BaseButton>
    </div>

    <p
        v-if="localError || externalError"
        class="col-span-4 text-sm text-red-500"
    >
      {{ externalError || localError }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import BaseInput from '../base/BaseInput.vue';
import BaseButton from '../base/BaseButton.vue';
import type { Level } from '../../types';

const props = defineProps<{
  externalError?: string;
}>();

const emit = defineEmits<{
  create: [
    payload: {
      name: string;
      group: string;
      email: string;
      github?: string;
      dob: string;
      level: Level;
    }
  ];
}>();

const form = reactive({
  name: '',
  group: '',
  email: '',
  github: '',
  dob: '',
  level: 'Junior' as Level
});

const localError = ref('');

const externalError = computed(() => props.externalError ?? '');

function reset() {
  form.name = '';
  form.group = '';
  form.email = '';
  form.github = '';
  form.dob = '';
  form.level = 'Junior';
}

function onSubmit() {
  localError.value = '';

  if (!form.name.trim() || !form.group.trim() || !form.email.trim() || !form.dob) {
    localError.value = 'Заповніть усі обовʼязкові поля.';
    return;
  }

  emit('create', {
    name: form.name.trim(),
    group: form.group.trim(),
    email: form.email.trim(),
    github: form.github.trim() || undefined,
    dob: form.dob,
    level: form.level
  });

  reset();
}
</script>
