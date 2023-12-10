<template>
  <div>
    <Sidebar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
main {
  margin-left: 250px; /* Ancho del menú */
  background-color: #ffffff;
  padding: 20px;
  color: #333;
}
</style>
