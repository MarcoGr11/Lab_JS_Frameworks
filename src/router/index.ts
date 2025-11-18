import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../view/Home.vue'
import AboutView from '../view/About.vue'
import LotteryView from '../view/Lottery.vue'
import LoginView from '../view/Login.vue'
import UsersListView from '../view/UsersList.vue'
import UserDetailsView from '../view/UserDetails.vue'
import { useAuthStore } from '@/composables/useAuth'



const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/lottery',
        name: 'lottery',
        component: LotteryView,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'users',
        component: UsersListView,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/:id',
        name: 'user-details',
        component: UserDetailsView,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
        next({
            name: 'login',
            query: { redirect: to.fullPath },
        })
        return
    }

    if (to.name === 'login' && auth.isAuthenticated.value) {
        next({ name: 'home' })
        return
    }

    next()
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
        next('/login')
    } else {
        next()
    }
})

export default router
