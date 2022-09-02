import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import HomeView from './views/HomeView.vue'

import './assets/styles.css'

export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    { 
        routes: [
            {
                path: '/',
                name: 'home',
                component: HomeView
            },
            {
                path: '/about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('./views/AboutView.vue')
            }
        ]
    },
)
/* 
export const createApp = ViteSSG(App)


app.mount('#app') */
