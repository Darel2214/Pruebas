import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

const api = axios.create({ baseURL: process.env.VUE_APP_API_URL });

const microservices = axios.create({
  baseURL: process.env.VUE_APP_MICROSERVICES_URL,
});

app.config.globalProperties.$http = api;
app.config.globalProperties.$microservices = microservices;

app.use(store).use(router).mount('#app');
