<template>
  <div>
    <h1 class="text-success">Club de fútbol</h1>
    <div class="mt-4"> <!-- Espacio superior añadido -->
      <!-- Botón para mostrar el formulario de creación -->
      <button @click="showCreateForm" class="btn btn-primary">Agregar Club de Fútbol</button>
    </div>

    <!-- Lista de clubes de fútbol en una tabla -->
    <table class="table mt-4"> <!-- Espacio superior añadido -->
      <thead class="thead-light"> <!-- Estilo oscuro para el encabezado -->
        <tr>
          <th>Nombre del Club</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="club in clubes" :key="club._id" @mouseover="highlightRow($event)" @mouseleave="unhighlightRow($event)">
          <td>{{ club.nombreclub }}</td>
          <td>{{ club.direccionclub }}</td>
          <td>
            <button @click="editClub(club)" class="btn btn-warning">Editar</button>
            <button @click="deleteClub(club._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Club de Fútbol' : 'Agregar Club de Fútbol' }}</h2>
      <form @submit.prevent="isEditing ? updateClub() : createClub()">
        <input v-model="formData.nombreclub" placeholder="Nombre del club" required class="form-control" />
        <input v-model="formData.direccionclub" placeholder="Dirección del club" required class="form-control" />
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
      clubes: [],
      showForm: false,
      formData: {
        nombreclub: '',
        direccionclub: '',
      },
      isEditing: false,
      editingClubId: null,
      highlightedRow: null,
    };
  },
  methods: {
    async fetchClubes() {
      try {
        const response = await this.$http.get('/clubfutbol');
        this.clubes = response.data.clubFutbol;
      } catch (error) {
        console.error('Error al obtener los clubes de fútbol', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombreclub: '',
        direccionclub: '',
      };
    },
    async createClub() {
      try {
        const response = await this.$http.post('/clubfutbol', this.formData);
        console.log(response.data.msg);
        this.fetchClubes();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el club de fútbol', error);
      }
    },
    editClub(club) {
      this.showForm = true;
      this.isEditing = true;
      this.editingClubId = club._id;
      this.formData = {
        nombreclub: club.nombreclub,
        direccionclub: club.direccionclub,
      };
    },
    async updateClub() {
      try {
        const response = await this.$http.put(`/clubfutbol/${this.editingClubId}`, this.formData);
        console.log(response.data.msg);
        this.fetchClubes();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el club de fútbol', error);
      }
    },
    async deleteClub(clubId) {
      try {
        const response = await this.$http.delete(`/clubfutbol/${clubId}`);
        console.log(response.data.msg);
        this.fetchClubes();
      } catch (error) {
        console.error('Error al eliminar el club de fútbol', error);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombreclub: '',
        direccionclub: '',
      };
    },
    highlightRow(event) {
      event.currentTarget.style.backgroundColor = '#cceeff'; // Color de resaltado al pasar el cursor
    },
    unhighlightRow(event) {
      event.currentTarget.style.backgroundColor = ''; // Restablecer el color de fondo al quitar el cursor
    },
  },
  mounted() {
    this.fetchClubes();
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
