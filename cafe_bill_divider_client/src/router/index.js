import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PositionsView from '../views/PositionsView.vue'

// eslint-disable-next-line no-prototype-builtins
const isAuthorized = localStorage.hasOwnProperty('token');

const authGuard = function (to, from, next) {
    console.log(`authorized: ${isAuthorized}`)
    if (!isAuthorized){
        next({name: 'home'}) // Change to Login
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
        path: '/about',
        name: 'about',
        component: AboutView,
        beforeEnter: authGuard
    },
    {
        path: '/positions',
        name: 'positions',
        component: PositionsView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
