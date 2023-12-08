import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

// Configura la URL base para todas las solicitudes Axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL; // Reemplaza con la URL de tu API

// Agrega Axios al prototipo de Vue para que esté disponible en todos los componentes
app.config.globalProperties.$http = axios;

app.use(store).use(router).mount('#app');
