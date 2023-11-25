<template>
  <div>
    <h1 class="text-success">Participación</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Participación</button>
    </div>

    <!-- Lista de participaciones en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Lugar del Equipo</th>
          <th>Fecha</th>
          <th>Torneo</th>
          <th>Equipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participacion in participaciones" :key="participacion._id">
          <td>{{ participacion.lugarequipo }}</td>
          <td>{{ formatFecha(participacion.fecha) }}</td>
          <td>{{ participacion.idTorneo.nombretorneo }}</td>
          <td>{{ participacion.idEquipo.nombreequipo }}</td>
          <td>
            <button @click="editParticipacion(participacion)" class="btn btn-warning">Editar</button>
            <button @click="deleteParticipacion(participacion._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Participación' : 'Agregar Participación' }}</h2>
      <form @submit.prevent="isEditing ? updateParticipacion() : createParticipacion()">
        <div class="form-group">
          <label for="lugarequipo">Lugar del Equipo</label>
          <input v-model="formData.lugarequipo" type="text" id="lugarequipo" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input v-model="formData.fecha" type="date" id="fecha" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="idTorneo">Torneo</label>
          <select v-model="formData.idTorneo" id="idTorneo" required class="form-control">
            <option value="" disabled>Selecciona un Torneo</option>
            <option v-for="torneo in listaTorneos" :key="torneo._id" :value="torneo._id">{{ torneo.nombretorneo }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="idEquipo">Equipo</label>
          <select v-model="formData.idEquipo" id="idEquipo" required class="form-control">
            <option value="" disabled>Selecciona un Equipo</option>
            <option v-for="equipo in listaEquipos" :key="equipo._id" :value="equipo._id">{{ equipo.nombreequipo }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">{{ isEditing ? 'Guardar Cambios' : 'Agregar' }}</button>
        <button @click="cancelEdit" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participaciones: [],
      showForm: false,
      formData: {
        lugarequipo: '',
        fecha: '',
        idTorneo: '',
        idEquipo: '',
      },
      isEditing: false,
      editingParticipacionId: null,
      listaTorneos: [], // Debes cargar la lista de torneos desde tu API
      listaEquipos: [], // Debes cargar la lista de equipos desde tu API
    };
  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return '';
      return new Date(fecha).toLocaleDateString();
    },
    async fetchTorneos() {
      try {
        const response = await this.$http.get('/torneo'); // Cambia la ruta según tu API
        this.listaTorneos = response.data.torneo; // Asegúrate de asignar correctamente los datos recibidos a listaTorneos
      } catch (error) {
        console.error('Error al obtener los torneos', error);
      }
    },
    async fetchEquipos() {
      try {
        const response = await this.$http.get('/equipo'); // Cambia la ruta según tu API
        this.listaEquipos = response.data.equipo; // Asegúrate de asignar correctamente los datos recibidos a listaEquipos
      } catch (error) {
        console.error('Error al obtener los equipos', error);
      }
    },
    async fetchParticipaciones() {
      try {
        const response = await this.$http.get('/participacion');
        this.participaciones = response.data.participacion;
      } catch (error) {
        console.error('Error al obtener las participaciones', error);
      }
    },
    async createParticipacion() {
      try {
        const response = await this.$http.post('/participacion', this.formData);
        console.log(response.data.msg);
        this.fetchParticipaciones();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar la participación', error);
      }
    },
    async updateParticipacion() {
      try {
        const response = await this.$http.put(`/participacion/${this.editingParticipacionId}`, this.formData);
        console.log(response.data.msg);
        this.fetchParticipaciones();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar la participación', error);
      }
    },
    async deleteParticipacion(participacionId) {
      try {
        const response = await this.$http.delete(`/participacion/${participacionId}`);
        console.log(response.data.msg);
        this.fetchParticipaciones();
      } catch (error) {
        console.error('Error al eliminar la participación', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        lugarequipo: '',
        fecha: '',
        idTorneo: '',
        idEquipo: '',
      };
    },
    editParticipacion(participacion) {
      this.showForm = true;
      this.isEditing = true;
      this.editingParticipacionId = participacion._id;
      this.formData = {
        lugarequipo: participacion.lugarequipo,
        fecha: participacion.fecha,
        idTorneo: participacion.idTorneo,
        idEquipo: participacion.idEquipo,
      };
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        lugarequipo: '',
        fecha: '',
        idTorneo: '',
        idEquipo: '',
      };
    },
  },
  mounted() {
    this.fetchParticipaciones();
    this.fetchTorneos();
    this.fetchEquipos();
    // Carga la lista de torneos y equipos desde tu API
    // Llama a tus métodos para cargar datos
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>