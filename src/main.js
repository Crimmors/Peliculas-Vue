import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router/main-router.js";

createApp(App).use(router).mount('#app')
