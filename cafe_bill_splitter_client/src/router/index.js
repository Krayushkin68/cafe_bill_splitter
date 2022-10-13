import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import BillCalculateView from '../views/BillCalculateView.vue'



const authGuard = function (to, from, next) {
    // eslint-disable-next-line no-prototype-builtins
    const isAuthorized = localStorage.hasOwnProperty('token');
    console.log(`authorized: ${isAuthorized}`)
    if (!isAuthorized){
        next({name: 'login'})
    } else {
        next();
    }
}



const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        beforeEnter: authGuard
    },
    {
        path: '/bill_calculate',
        name: 'bill_calculate',
        component: BillCalculateView,
        beforeEnter: authGuard
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
