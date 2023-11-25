<template>
  <div>
    <h1 class="text-success">Concursos y Torneos</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Concurso/Torneo</button>
    </div>

    <!-- Lista de concursos y torneos en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Nombre del Concurso/Torneo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="concursotorneo in concursotorneos" :key="concursotorneo._id">
          <td>{{ concursotorneo.nombreconcurso }}</td>
          <td>
            <button @click="editConcursoTorneo(concursotorneo)" class="btn btn-warning">Editar</button>
            <button @click="deleteConcursoTorneo(concursotorneo._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Concurso/Torneo' : 'Agregar Concurso/Torneo' }}</h2>
      <form @submit.prevent="isEditing ? updateConcursoTorneo() : createConcursoTorneo()">
        <div class="form-group">
          <label for="nombreconcurso">Nombre del Concurso/Torneo</label>
          <input v-model="formData.nombreconcurso" type="text" id="nombreconcurso" required class="form-control" />
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
      concursotorneos: [],
      showForm: false,
      formData: {
        nombreconcurso: '',
      },
      isEditing: false,
      editingConcursoTorneoId: null,
    };
  },
  methods: {
    async fetchConcursoTorneos() {
      try {
        const response = await this.$http.get('/concursotorneo');
        this.concursotorneos = response.data.concursotorneo;
      } catch (error) {
        console.error('Error al obtener los concursos y torneos', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombreconcurso: '',
      };
    },
    async createConcursoTorneo() {
      try {
        const response = await this.$http.post('/concursotorneo', this.formData);
        console.log(response.data.msg);
        this.fetchConcursoTorneos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el concurso/torneo', error);
      }
    },
    editConcursoTorneo(concursotorneo) {
      this.showForm = true;
      this.isEditing = true;
      this.editingConcursoTorneoId = concursotorneo._id;
      this.formData = {
        nombreconcurso: concursotorneo.nombreconcurso,
      };
    },
    async updateConcursoTorneo() {
      try {
        const response = await this.$http.put(`/concursotorneo/${this.editingConcursoTorneoId}`, this.formData);
        console.log(response.data.msg);
        this.fetchConcursoTorneos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el concurso/torneo', error);
      }
    },
    async deleteConcursoTorneo(concursotorneoId) {
      try {
        const response = await this.$http.delete(`/concursotorneo/${concursotorneoId}`);
        console.log(response.data.msg);
        this.fetchConcursoTorneos();
      } catch (error) {
        console.error('Error al eliminar el concurso/torneo', error);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombreconcurso: '',
      };
    },
  },
  mounted() {
    this.fetchConcursoTorneos();
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
