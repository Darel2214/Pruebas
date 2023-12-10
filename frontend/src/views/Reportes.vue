<template>
  <div class="d-flex flex-column" style="gap: 10px">
    <h1 class="text-success">Reportes</h1>

    <div
      class="d-flex justify-content-start align-items-center"
      style="gap: 20px"
    >
      <button @click="generateFirstChart" class="btn btn-primary">
        Reporte Goles por Fechas
      </button>

      <button @click="generateSecondChart" class="btn btn-primary">
        Reporte Goles por Equipo
      </button>

      <button @click="generateThirdChart" class="btn btn-primary">
        Victorias por Equipo
      </button>

      <select class="form-control" v-model="clubSelected">
        <option :value="club.value" v-for="club in clubes" :key="club.value">
          {{ club.name }}
        </option>
      </select>
    </div>

    <div class="chart-container" v-if="chartData.datasets.length > 0">
      <Bar
        :options="chartOptions"
        :data="chartData"
        style="height: 100%; width: 100%"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { toast } from 'vue3-toastify';

import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { Bar },
  data() {
    return {
      clubes: [],
      clubSelected: '',
      chartOptions: {
        responsive: true,
      },
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },

  methods: {
    async getClubes() {
      try {
        const { data } = await this.$http.get('/clubfutbol');

        const clubes = data.clubFutbol.map(item => ({
          name: item.nombreclub,
          value: item.nombreclub,
        }));

        clubes.unshift({ name: 'Selecciona un equipo', value: '' });

        this.clubes = clubes;
      } catch (error) {
        console.error('Error al obtener los equipos', error);
      }
    },

    async generateFirstChart() {
      const { data } = await this.$microservices.post('/graphql', {
        query: `
           query {
              todos {
                fecha
                marcador1
                marcador2
              }
            }
          `,
      });

      const total = {};

      data.data.todos.forEach(item => {
        const date = moment.utc(item.fecha).format('DD/MM/YYYY');

        const totalGoals = item.marcador1 + item.marcador2;

        if (!total[date]) {
          total[date] = { date, total: 0 };
        }

        total[date].total += totalGoals;
      });

      const res = Object.values(total).sort((a, b) =>
        a.date.localeCompare(b.date, 'en', { numeric: true })
      );

      this.chartData = {
        labels: res.map(item => item.date),
        datasets: [
          {
            label: 'Fechas con más goles',
            backgroundColor: '#32d692',
            data: res.map(item => item.total),
          },
        ],
      };
    },

    async generateSecondChart() {
      const { data } = await this.$microservices.post('/graphql', {
        query: `
           query {
              todos {
                marcador1
                marcador2
                equipo1
                equipo2
              }
            }
          `,
      });

      const total = {};

      data.data.todos.forEach(item => {
        const team1 = item.equipo1;
        const team2 = item.equipo2;

        if (!total[team1]) {
          total[team1] = { team: team1, total: 0 };
        }

        if (!total[team2]) {
          total[team2] = { team: team2, total: 0 };
        }

        total[team1].total += item.marcador1;
        total[team2].total += item.marcador2;
      });

      const res = Object.values(total).sort((a, b) => b.total - a.total);

      this.chartData = {
        labels: res.map(item => item.team),
        datasets: [
          {
            label: 'Equipos con más goles',
            backgroundColor: '#32d692',
            data: res.map(item => item.total),
          },
        ],
      };
    },

    async generateThirdChart() {
      if (this.clubSelected === '') {
        toast.warning('Seleccione un Equipo para Generar el Reporte');
        return;
      }

      const { data } = await this.$microservices.post('/graphql', {
        query: `
            query($equipo: String!) {
              equipo(equipo: $equipo) {
                equipo1
                equipo2
                marcador1
                marcador2
              }
            }
          `,
        variables: {
          equipo: this.clubSelected,
        },
      });

      const total = {};

      data.data.equipo.forEach(item => {
        const team =
          item.equipo1 === this.clubSelected ? item.equipo2 : item.equipo1;

        if (!total[team]) {
          total[team] = { team: team, total: 0 };
        }

        if (this.clubSelected === item.equipo1) {
          if (item.marcador1 > item.marcador2) {
            total[team].total++;
          }
        } else if (this.clubSelected === item.equipo2) {
          if (item.marcador2 > item.marcador1) {
            total[team].total++;
          }
        }
      });

      const res = Object.values(total).sort((a, b) => b.total - a.total);

      this.chartData = {
        labels: res.map(item => item.team),
        datasets: [
          {
            label: 'Victorias por equipo',
            backgroundColor: '#32d692',
            data: res.map(item => item.total),
          },
        ],
      };
    },
  },
  mounted() {
    this.getClubes();
  },
};
</script>

<style scoped>
.chart-container {
  height: 500px;
  max-height: 500px;
  border: 2px solid #32d692;
  border-radius: 5px;
  display: flex;
  padding: 10px;
}
</style>
