import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.Js';

import './assets/style/style.css'

const app = createApp(App);

app.use(router);

app.mount('#app');
