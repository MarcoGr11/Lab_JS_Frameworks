<template>
  <main class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-6 space-y-12">
      <section>
        <h1 class="text-3xl font-semibold text-slate-900 mb-6">
          Lab 5 – Users list
        </h1>
        <UsersList />
      </section>

      <section>
        <h2 class="text-3xl font-semibold text-slate-900 mb-6">
          Lab 6 – Registration & Winners
        </h2>
        <Lab6Lottery />
      </section>

      <section>
        <h2 class="text-3xl font-semibold text-slate-900 mb-6">
          Lab 7 – Registration & CRUD
        </h2>
        <Lab7Lottery />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import UsersList from './components/UsersList.vue';
import Lab6Lottery from './components/Lab6Lottery.vue';
import Lab7Lottery from './components/Lab7Lottery.vue';

</script>
