import { createApp } from 'vue';
import axios from 'axios';
import Vue3Toastify from 'vue3-toastify';
import App from './App.vue';
import router from './router';
import store from './store';
import { isAuthenticated } from './auth';

import 'vue3-toastify/dist/index.css';

const app = createApp(App);

const api = axios.create({ baseURL: process.env.VUE_APP_API_URL });

const microservices = axios.create({
  baseURL: process.env.VUE_APP_MICROSERVICES_URL,
});

app.config.globalProperties.$http = api;
app.config.globalProperties.$microservices = microservices;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

app.use(Vue3Toastify, {
  autoClose: 1500,
  clearOnUrlChange: false,
  hideProgressBar: true,
  theme: 'colored',
});

app.use(store).use(router).mount('#app');
