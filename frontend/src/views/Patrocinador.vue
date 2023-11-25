<template>
  <div>
    <h1 class="text-success">Patrocinadores</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Patrocinador</button>
    </div>

    <!-- Lista de patrocinadores en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Nombre del Patrocinador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patrocinador in patrocinadores" :key="patrocinador._id">
          <td>{{ patrocinador.nombre }}</td>
          <td>
            <button @click="editPatrocinador(patrocinador)" class="btn btn-warning">Editar</button>
            <button @click="deletePatrocinador(patrocinador._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Patrocinador' : 'Agregar Patrocinador' }}</h2>
      <form @submit.prevent="isEditing ? updatePatrocinador() : createPatrocinador()">
        <div class="form-group">
          <label for="nombrePatrocinador">Nombre del Patrocinador</label>
          <input v-model="formData.nombre" type="text" id="nombrePatrocinador" required class="form-control" />
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
      patrocinadores: [],
      showForm: false,
      formData: {
        nombre: '',
      },
      isEditing: false,
      editingPatrocinadorId: null,
    };
  },
  methods: {
    async fetchPatrocinadores() {
      try {
        const response = await this.$http.get('/patrocinador');
        this.patrocinadores = response.data.patrocinador;
      } catch (error) {
        console.error('Error al obtener los patrocinadores', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombre: '',
      };
    },
    async createPatrocinador() {
      try {
        const response = await this.$http.post('/patrocinador', this.formData);
        console.log(response.data.msg);
        this.fetchPatrocinadores();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el patrocinador', error);
      }
    },
    editPatrocinador(patrocinador) {
      this.showForm = true;
      this.isEditing = true;
      this.editingPatrocinadorId = patrocinador._id;
      this.formData = {
        nombre: patrocinador.nombre,
      };
    },
    async updatePatrocinador() {
      try {
        const response = await this.$http.put(`/patrocinador/${this.editingPatrocinadorId}`, this.formData);
        console.log(response.data.msg);
        this.fetchPatrocinadores();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el patrocinador', error);
      }
    },
    async deletePatrocinador(patrocinadorId) {
      try {
        const response = await this.$http.delete(`/patrocinador/${patrocinadorId}`);
        console.log(response.data.msg);
        this.fetchPatrocinadores();
      } catch (error) {
        console.error('Error al eliminar el patrocinador', error);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombre: '',
      };
    },
  },
  mounted() {
    this.fetchPatrocinadores();
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
