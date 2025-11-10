<template>
  <BaseInput
      v-model="term"
      placeholder="Пошук за ім’ям..."
      class="w-full max-w-md"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../base/BaseInput.vue';

const emit = defineEmits<{
  'filter-by-name': [val: string];
}>();

const term = ref('');

watch(term, val => emit('filter-by-name', val));
</script>
