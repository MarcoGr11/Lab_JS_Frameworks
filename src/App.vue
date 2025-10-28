<template>
  <main class="container">
    <h1>Users</h1>
    <UsersList />
  </main>
</template>

<script setup lang="ts">
import UsersList from './components/UsersList.vue'
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 26px auto;
  padding: 0 16px;
}
h1 {
  margin: 0 0 14px;
  font-size: 28px;
}
</style>
