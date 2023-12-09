<template>
  <div class="d-flex flex-column" style="gap: 10px">
    <h1 class="text-success">Partidos</h1>

    <button @click="showCreateForm" class="btn btn-primary w-25">
      Iniciar Partido
    </button>

    <!-- Formulario de creación -->
    <div v-if="createForm">
      <h2>Nuevo Partido</h2>

      <form
        @submit.prevent="create()"
        class="d-flex flex-row align-items-center"
        style="gap: 20px"
      >
        <select class="form-control" v-model="formData.equipo1" required>
          <option :value="club.value" v-for="club in clubes" :key="club.value">
            {{ club.name }}
          </option>
        </select>

        <strong>VS</strong>

        <select class="form-control" v-model="formData.equipo2" required>
          <option :value="club.value" v-for="club in clubes" :key="club.value">
            {{ club.name }}
          </option>
        </select>

        <button type="submit" class="btn btn-success">Agregar</button>
        <button @click="hideCreateForm" class="btn btn-danger">Cancelar</button>
      </form>
    </div>

    <!-- Formulario de edición -->
    <div v-if="editForm">
      <h2>Actualizar Partido</h2>

      <form
        @submit.prevent="update()"
        class="d-flex flex-row align-items-center"
        style="gap: 20px"
      >
        <select class="form-control" v-model="editFormData.equipo1" required>
          <option :value="club.value" v-for="club in clubes" :key="club.value">
            {{ club.name }}
          </option>
        </select>

        <strong>VS</strong>

        <select class="form-control" v-model="editFormData.equipo2" required>
          <option :value="club.value" v-for="club in clubes" :key="club.value">
            {{ club.name }}
          </option>
        </select>

        <input
          v-model="editFormData.dateFormat"
          type="date"
          required
          class="form-control"
        />

        <input
          v-model="editFormData.hora"
          type="time"
          required
          class="form-control"
        />

        <input
          v-model="editFormData.marcador1"
          type="number"
          min="0"
          required
          class="form-control"
        />

        <input
          v-model="editFormData.marcador2"
          type="number"
          min="0"
          required
          class="form-control"
        />

        <button type="submit" class="btn btn-success">Actualizar</button>
        <button @click="hideEditForm" class="btn btn-danger">Cancelar</button>
      </form>
    </div>

    <!-- Lista de jugadores en una tabla -->
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th>Fecha de Partido</th>
          <th>Equipo 1</th>
          <th>Equipo 2</th>
          <th>Marcador</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="match in data"
          :key="match._id"
          @mouseover="highlightRow($event)"
          @mouseleave="unhighlightRow($event)"
        >
          <td>{{ match.dateFormat }} {{ match.hora }}</td>
          <td>{{ match.equipo1 }}</td>
          <td>{{ match.equipo2 }}</td>
          <td>{{ match.marcador1 }} - {{ match.marcador2 }}</td>
          <td>{{ match.estado }}</td>
          <td>
            <div v-if="match.estado !== 'Activo'">
              <button @click="showEditForm(match)" class="btn btn-warning mx-2">
                Editar
              </button>

              <button @click="deleteMatch(match._id)" class="btn btn-danger">
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      clubes: [],
      data: [],
      createForm: false,
      formData: {
        equipo1: '',
        equipo2: '',
      },
      editForm: false,
      editFormData: {
        equipo1: '',
        equipo2: '',
        marcador1: 0,
        marcador2: 0,
        fecha: null,
        hora: '',
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
        console.error('Error al obtener los partidos', error);
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$microservices.get('/match');

        const matches = data.map(item => {
          item.dateFormat = moment(item.fecha).format('YYYY-MM-DD');
          return item;
        });

        this.data = matches;
      } catch (error) {
        console.error('Error al obtener los partidos', error);
      }
    },

    showCreateForm() {
      this.createForm = true;
      this.formData = {
        equipo1: '',
        equipo2: '',
      };
    },

    hideCreateForm() {
      this.createForm = false;
      this.formData = {
        equipo1: '',
        equipo2: '',
      };
    },

    async create() {
      try {
        const data = {
          fecha: moment().toISOString(),
          hora: moment().format('HH:mm'),
          equipo1: this.formData.equipo1,
          equipo2: this.formData.equipo2,
          marcador1: 0,
          marcador2: 0,
          mesajes: [],
          estado: 'Activo',
        };

        await this.$microservices.post('/match', data);
        this.fetchData();
        this.hideCreateForm();
      } catch (error) {
        console.error('Error al agregar partido', error);
      }
    },

    showEditForm(item) {
      this.editForm = true;
      this.editFormData = item;
    },

    hideEditForm() {
      this.editForm = false;
      this.editFormData = {
        equipo1: '',
        equipo2: '',
        marcador1: 0,
        marcador2: 0,
        fecha: null,
        hora: null,
      };
    },

    async update() {
      try {
        const data = {
          id: this.editFormData._id,
          fecha: moment(
            this.editFormData.dateFormat,
            'YYYY-MM-DD'
          ).toISOString(),
          hora: this.editFormData.hora,
          equipo1: this.editFormData.equipo1,
          equipo2: this.editFormData.equipo2,
          marcador1: Number(this.editFormData.marcador1),
          marcador2: Number(this.editFormData.marcador2),
        };

        await this.$microservices.put(`/match/`, data);
        this.fetchData();
        this.hideEditForm();
      } catch (error) {
        console.error('Error al actualizar el partido', error);
      }
    },

    async deleteMatch(id) {
      try {
        await this.$microservices.delete(`/match/${id}`);
        this.fetchData();
      } catch (error) {
        console.error('Error al eliminar el partido', error);
      }
    },

    highlightRow(event) {
      event.currentTarget.style.backgroundColor = '#cceeff';
    },
    unhighlightRow(event) {
      event.currentTarget.style.backgroundColor = '';
    },
  },
  mounted() {
    this.fetchData();
    this.getClubes();
  },
};
</script>
