import { ref, computed } from 'vue'
import { AuthRepository } from '@/repositories/AuthRepository'

const TOKEN_KEY = 'auth_token'
const EMAIL_KEY = 'auth_email'

const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
const email = ref<string | null>(localStorage.getItem(EMAIL_KEY))

export function useAuthStore() {
    const isAuthenticated = computed(() => !!token.value)

    async function login(loginEmail: string, password: string) {
        const receivedToken = await AuthRepository.login(loginEmail, password)
        token.value = receivedToken
        email.value = loginEmail

        localStorage.setItem(TOKEN_KEY, receivedToken)
        localStorage.setItem(EMAIL_KEY, loginEmail)
    }

    function logout() {
        token.value = null
        email.value = null
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(EMAIL_KEY)
    }

    return {
        token,
        email,
        isAuthenticated,
        login,
        logout,
    }
}
