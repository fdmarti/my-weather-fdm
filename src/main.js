import { createApp } from 'vue'

import App from './App.vue'
import store from '../src/store'

import './index.css'
import './assets/css/transitions.css'

import 'boxicons'

const app = createApp(App)
app.use(store)


app.mount('#app')
