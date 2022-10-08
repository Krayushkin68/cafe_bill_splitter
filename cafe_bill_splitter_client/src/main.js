import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VIntersection from "@/directives/VIntersection";


const app = createApp(App)

app.directive('intersection', VIntersection)

app.use(store).use(router).mount('#app')

