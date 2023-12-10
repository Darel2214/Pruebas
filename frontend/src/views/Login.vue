<template>
  <div class="container w-50">
    <div class="container-logo">
      <img :src="getLogoPath()" alt="Logo" class="logo" />
      <h2 class="mt-5 mb-3 text-center text-success">Futbolito Admin</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" v-model="email" class="form-control" id="email" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
import { login } from '../auth';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const loginData = {
            email: this.email.trim(),
            password: this.password,
          };

          const { data } = await this.$microservices.post(
            '/api/v2/auth/login',
            loginData
          );

          if (data.success) {
            login();
            this.$router.push('/');
            toast.success(data.message);
          } else {
            toast.warning(data.message);
          }
        } catch (error) {
          console.log('error', error);
          toast.error('Ocurrió un error! \Inténtelo más tarde');
        }
      }
    },

    validateForm() {
      if (this.email === '') {
        toast.warning('El email está vacío!');
        return false;
      }

      if (this.password === '') {
        toast.warning('La contraseña está vacía!');
        return false;
      }

      return true;
    },

    getLogoPath() {
      return `${process.env.BASE_URL}icon.png`;
    },
  },
};
</script>

<style scoped>
.container-logo {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
img {
  height: 150px;
}
</style>
