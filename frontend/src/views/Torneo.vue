<template>
  <div>
    <h1 class="text-success">Torneos</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Torneo</button>
    </div>

    <!-- Lista de torneos en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Nombre del Torneo</th>
          <th>Fecha de Inicio</th>
          <th>Fecha Final</th>
          <th>Concurso/Torneo</th>
          <th>Patrocinador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="torneo in torneos" :key="torneo._id">
          <td>{{ torneo.nombretorneo }}</td>
          <td>{{ formatFecha(torneo.fechainicio) }}</td>
          <td>{{ formatFecha(torneo.fechafinal) }}</td>
          <td>{{ torneo.idConcursoTorneo.nombreconcurso }}</td>
          <td>{{ torneo.idPatrocinador.nombre }}</td>
          <td>
            <button @click="editTorneo(torneo)" class="btn btn-warning">Editar</button>
            <button @click="deleteTorneo(torneo._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Torneo' : 'Agregar Torneo' }}</h2>
      <form @submit.prevent="isEditing ? updateTorneo() : createTorneo()">
        <div class="form-group">
          <label for="nombretorneo">Nombre del Torneo</label>
          <input v-model="formData.nombretorneo" type="text" id="nombretorneo" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="fechainicio">Fecha de Inicio</label>
          <input v-model="formData.fechainicio" type="date" id="fechainicio" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="fechafinal">Fecha Final</label>
          <input v-model="formData.fechafinal" type="date" id="fechafinal" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="idConcursoTorneo">Concurso/Torneo</label>
          <select v-model="formData.idConcursoTorneo" id="idConcursoTorneo" required class="form-control">
            <option value="" disabled>Selecciona un Concurso/Torneo</option>
            <option v-for="concursoTorneo in listaConcursosTorneos" :key="concursoTorneo._id" :value="concursoTorneo._id">{{ concursoTorneo.nombreconcurso }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="idPatrocinador">Patrocinador</label>
          <select v-model="formData.idPatrocinador" id="idPatrocinador" required class="form-control">
            <option value="" disabled>Selecciona un Patrocinador</option>
            <option v-for="patrocinador in listaPatrocinadores" :key="patrocinador._id" :value="patrocinador._id">{{ patrocinador.nombre }}</option>
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
      torneos: [],
      showForm: false,
      formData: {
        nombretorneo: '',
        fechainicio: '',
        fechafinal: '',
        idConcursoTorneo: '',
        idPatrocinador: '',
      },
      isEditing: false,
      editingTorneoId: null,
      listaConcursosTorneos: [], // Debes cargar la lista de concursos/torneos desde tu API
      listaPatrocinadores: [], // Debes cargar la lista de patrocinadores desde tu API
    };
  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return '';
      return new Date(fecha).toLocaleDateString();
    },
    async fetchConcursosTorneos() {
      try {
        const response = await this.$http.get('/concursotorneo'); // Cambia la ruta según tu API
        this.listaConcursosTorneos = response.data.concursotorneo; // Asegúrate de asignar correctamente los datos recibidos a listaConcursosTorneos
      } catch (error) {
        console.error('Error al obtener los concursos/torneos', error);
      }
    },
    async fetchPatrocinadores() {
      try {
        const response = await this.$http.get('/patrocinador'); // Cambia la ruta según tu API
        this.listaPatrocinadores = response.data.patrocinador; // Asegúrate de asignar correctamente los datos recibidos a listaPatrocinadores
      } catch (error) {
        console.error('Error al obtener los patrocinadores', error);
      }
    },
    async fetchTorneos() {
      try {
        const response = await this.$http.get('/torneo');
        this.torneos = response.data.torneo;
      } catch (error) {
        console.error('Error al obtener los torneos', error);
      }
    },
    async createTorneo() {
      try {
        const response = await this.$http.post('/torneo', this.formData);
        console.log(response.data.msg);
        this.fetchTorneos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el torneo', error);
      }
    },
    async updateTorneo() {
      try {
        const response = await this.$http.put(`/torneo/${this.editingTorneoId}`, this.formData);
        console.log(response.data.msg);
        this.fetchTorneos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el torneo', error);
      }
    },
    async deleteTorneo(torneoId) {
      try {
        const response = await this.$http.delete(`/torneo/${torneoId}`);
        console.log(response.data.msg);
        this.fetchTorneos();
      } catch (error) {
        console.error('Error al eliminar el torneo', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombretorneo: '',
        fechainicio: '',
        fechafinal: '',
        idConcursoTorneo: '',
        idPatrocinador: '',
      };
    },
    editTorneo(torneo) {
      this.showForm = true;
      this.isEditing = true;
      this.editingTorneoId = torneo._id;
      this.formData = {
        nombretorneo: torneo.nombretorneo,
        fechainicio: torneo.fechainicio,
        fechafinal: torneo.fechafinal,
        idConcursoTorneo: torneo.idConcursoTorneo,
        idPatrocinador: torneo.idPatrocinador,
      };
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombretorneo: '',
        fechainicio: '',
        fechafinal: '',
        idConcursoTorneo: '',
        idPatrocinador: '',
      };
    },
  },
  mounted() {
    this.fetchTorneos();
    this.fetchConcursosTorneos(); // Agregar la llamada para cargar la lista de concursos/torneos
    this.fetchPatrocinadores(); // Agregar la llamada para cargar la lista de patrocinadores
    // Carga la lista de concursos/torneos y patrocinadores desde tu API
    // Llama a tus métodos para cargar datos
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>