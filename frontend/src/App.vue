<template>
  <div id="app">
    <!-- Contenido principal -->
    <main>
     
    </main>
    
    <!-- Importa y utiliza Sidebar.vue -->
    <Sidebar />
  </div>
</template>

<script>
// Importa el componente Sidebar.vue
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar, // Registra el componente Sidebar para su uso
  },
};
</script>

<style>
/* Estilos de App.vue */
</style>
