<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-slate-700">
      {{ label }}
    </label>
    <input
        :type="type"
        v-model="inner"
        class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        v-bind="$attrs"
    />
    <p v-if="msg" class="text-xs text-red-500">
      {{ msg }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  type?: string;
  error?: string;
  externalError?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text'
});

const emit = defineEmits<{
  'update:modelValue': [val: string];
}>();

const inner = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
});

const msg = computed(() => props.externalError || props.error || '');
</script>
