<template>
  <section class="max-w-md mx-auto space-y-6">
    <h1 class="text-3xl font-semibold text-slate-800">Login</h1>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

      <div>
        <label class="block text-sm text-slate-700 mb-1">Email</label>
        <Field
            name="email"
            type="email"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <p class="text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm text-slate-700 mb-1">Password</label>
        <Field
            name="password"
            type="password"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <p class="text-sm text-red-500">{{ errors.password }}</p>
      </div>

      <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold mt-3 hover:bg-blue-700 disabled:opacity-40"
          :disabled="loading"
      >
        {{ loading ? 'Входимо...' : 'Увійти' }}
      </button>

      <p v-if="error" class="text-sm text-red-500 mt-2">{{ error }}</p>
    </Form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/composables/useAuth'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const error = ref('')

const schema = yup.object({
  email: yup.string().email('Некоректний email').required('Email обов’язковий'),
  password: yup.string().min(3, 'Мінімум 3 символи').required('Пароль обовʼязковий')
})

async function onSubmit(values: any) {
  error.value = ''
  loading.value = true
  try {
    await auth.login(values.email, values.password)
    router.push('/')
  } catch (e: any) {
    error.value = 'Невірний email або пароль'
  } finally {
    loading.value = false
  }
}
</script>
