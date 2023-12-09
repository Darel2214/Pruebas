<template>
  <div>
    <!-- Menú desplegable -->
    <nav class="sidebar">
      <!-- Logo o título del dashboard -->

      <router-link to="/" class="nav-link">
        <div class="sidebar-logo">
          <img :src="getLogoPath()" alt="Logo" class="logo" />
          <h2>Dashboard</h2>
        </div>
      </router-link>

      <router-link to="/" class="nav-link">INICIO</router-link>

      <router-link to="/partidos" class="nav-link">PARTIDOS</router-link>

      <router-link to="/ClubFutbol" class="nav-link"
        >CLUB DE FÚTBOL</router-link
      >

      <router-link to="/Jugador" class="nav-link">JUGADOR</router-link>

      <router-link to="/Equipo" class="nav-link">EQUIPO</router-link>

      <router-link to="/Membresia" class="nav-link">MEMBRESIA</router-link>

      <router-link to="/ConcursoTorneo" class="nav-link"
        >CONCURSO DE TORNEO</router-link
      >

      <router-link to="/Patrocinador" class="nav-link"
        >PATROCINADOR</router-link
      >

      <router-link to="/Torneo" class="nav-link">TORNEO</router-link>

      <router-link to="/Participacion" class="nav-link"
        >PARTICIPACION</router-link
      >
    </nav>

    <!-- Contenido principal -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    getLogoPath() {
      return `${process.env.BASE_URL}icon.png`;
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para el menú */
.sidebar {
  width: 250px; /* Ancho del menú */
  color: #333; /* Color del texto en el menú */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  background-color: #32d692c5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.sidebar-logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
img {
  height: 60px;
}

h2 {
  font-size: 20px;
  color: #333;
  text-transform: uppercase;
}

/* Estilos para los enlaces del menú */
.nav-link {
  padding: 15px 15px 15px 30px; /* Espaciado en los enlaces */
  transition: background-color 0.2s; /* Transición de color de fondo en el hover */
  border-bottom: 1px solid #ddd; /* Línea separadora entre elementos */
  background-color: transparent; /* Fondo transparente */
  text-decoration: none; /* Elimina el subrayado del texto */
  color: #333; /* Color del texto en los enlaces */
  text-transform: uppercase; /* Convertir el texto en mayúsculas */
  letter-spacing: 1px; /* Espaciado entre letras */
}

.nav-link:hover {
  background-color: #32d692;
}

/* Espacio superior para el contenido principal */
main {
  margin-left: 250px; /* Ancho del menú */
  background-color: #ffffff;
  padding: 20px;
  color: #333;
}
</style>
