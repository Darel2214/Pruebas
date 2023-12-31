import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'Inicio',
        component: () => import('../views/Inicio.vue'),
      },
      {
        path: '/partidos',
        name: 'Partidos',
        component: () => import('../views/Partido.vue'),
      },
      {
        path: '/ClubFutbol',
        name: 'Club de Fútbol',
        component: () => import('../views/ClubFutbol.vue'),
      },
      {
        path: '/Equipo',
        name: 'Equipo',
        component: () => import('../views/Equipo.vue'),
      },
      {
        path: '/Jugador',
        name: 'Jugador',
        component: () => import('../views/Jugador.vue'),
      },
      {
        path: '/Membresia',
        name: 'Membresia',
        component: () => import('../views/Membresia.vue'),
      },
      {
        path: '/Participacion',
        name: 'Participacion',
        component: () => import('../views/Participacion.vue'),
      },
      {
        path: '/Patrocinador',
        name: 'Patrocinador',
        component: () => import('../views/Patrocinador.vue'),
      },
      {
        path: '/Torneo',
        name: 'Torneo',
        component: () => import('../views/Torneo.vue'),
      },
      {
        path: '/ConcursoTorneo',
        name: 'ConcursoTorneo',
        component: () => import('../views/ConcursoTorneo.vue'),
      },
      {
        path: '/reportes',
        name: 'Reportes',
        component: () => import('../views/Reportes.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
