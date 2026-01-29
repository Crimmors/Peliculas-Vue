import { createMemoryHistory, createRouter } from 'vue-router'
import MovieHome from "@/components/movieHome.vue";
import MovieDetail from "@/components/movieDetail.vue";
import Home from "@/components/home.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/movies', component: MovieHome },
    { path: '/details/:id', component: MovieDetail },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})