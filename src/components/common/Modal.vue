<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
          v-if="open"
          class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          @click.self="close"
      >
        <Transition name="scale">
          <div
              class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
              tabindex="0"
              @keyup.esc="close"
          >
            <header class="mb-4 flex items-center justify-between gap-4">
              <h3 class="text-lg font-semibold text-slate-900">
                <slot name="title" />
              </h3>
              <button
                  type="button"
                  class="text-slate-400 hover:text-slate-600"
                  @click="close"
              >
                ✕
              </button>
            </header>

            <div class="space-y-4">
              <slot />
            </div>

            <footer class="mt-6 flex justify-end gap-3">
              <slot name="footer" />
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>();

const emit = defineEmits<{ close: [] }>();

function close() {
  if (!props.open) return;
  emit('close');
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.15s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
}
</style>
