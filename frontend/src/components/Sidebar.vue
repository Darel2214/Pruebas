<template>
    <div>
      <!-- Menú desplegable -->
      <nav class="sidebar" style="background-color: #32d692c5; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
        <!-- Logo o título del dashboard -->
        <div class="sidebar-logo">
          <h2 style="color: #333; text-transform: uppercase;">Mi Dashboard</h2>
        </div>
  
        <!-- Enlaces del menú -->
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/" class="nav-link">INICIO</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ClubFutbol" class="nav-link">CLUB DE FÚTBOL</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Jugador" class="nav-link">JUGADOR</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Membresia" class="nav-link">MEMBRESIA</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Equipo" class="nav-link">EQUIPO</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ConcursoTorneo" class="nav-link">CONCURSO DE TORNEO</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Patrocinador" class="nav-link">PATROCINADOR</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Torneo" class="nav-link">TORNEO</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Participacion" class="nav-link">PARTICIPACION</router-link>
          </li>
          <!-- Agrega enlaces para otras entidades aquí -->
        </ul>
      </nav>
  
      <!-- Contenido principal -->
      <main style="background-color: #ffffff; padding: 10px; color: #333;">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    // Componente de menú desplegable
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
  }
  
  .sidebar-logo {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar-logo h2 {
    font-size: 24px;
  }
  
  /* Estilos para los enlaces del menú */
  .nav-link {
    padding: 10px 20px; /* Espaciado en los enlaces */
    transition: background-color 0.2s; /* Transición de color de fondo en el hover */
    border-bottom: 1px solid #ddd; /* Línea separadora entre elementos */
    background-color: transparent; /* Fondo transparente */
    text-decoration: none; /* Elimina el subrayado del texto */
    color: #333; /* Color del texto en los enlaces */
    text-transform: uppercase; /* Convertir el texto en mayúsculas */
    letter-spacing: 1px; /* Espaciado entre letras */
    margin-bottom: 15px; /* Espaciado inferior entre elementos */
  }
  
  /* Espacio superior para el contenido principal */
  main {
    margin-left: 250px; /* Ancho del menú */
  }
  
  </style>
  