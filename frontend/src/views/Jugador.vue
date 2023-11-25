<template>
  <div>
    <h1 class="text-success">Jugadores</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Jugador</button>
    </div>

    <!-- Lista de jugadores en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Nombre del Jugador</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jugador in jugadores" :key="jugador._id" @mouseover="highlightRow($event)" @mouseleave="unhighlightRow($event)">
          <td>{{ jugador.nombre }}</td>
          <td>{{ jugador.direccion }}</td>
          <td>
            <button @click="editJugador(jugador)" class="btn btn-warning">Editar</button>
            <button @click="deleteJugador(jugador._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Jugador' : 'Agregar Jugador' }}</h2>
      <form @submit.prevent="isEditing ? updateJugador() : createJugador()">
        <input v-model="formData.nombre" placeholder="Nombre del jugador" required class="form-control" />
        <input v-model="formData.direccion" placeholder="Dirección del jugador" required class="form-control" />
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
      jugadores: [],
      showForm: false,
      formData: {
        nombre: '',
        direccion: '',
      },
      isEditing: false,
      editingJugadorId: null,
      highlightedRow: null,
    };
  },
  methods: {
    async fetchJugadores() {
      try {
        const response = await this.$http.get('/jugador');
        this.jugadores = response.data.jugador;
      } catch (error) {
        console.error('Error al obtener los jugadores', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombre: '',
        direccion: '',
      };
    },
    async createJugador() {
      try {
        const response = await this.$http.post('/jugador', this.formData);
        console.log(response.data.msg);
        this.fetchJugadores();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el jugador', error);
      }
    },
    editJugador(jugador) {
      this.showForm = true;
      this.isEditing = true;
      this.editingJugadorId = jugador._id;
      this.formData = {
        nombre: jugador.nombre,
        direccion: jugador.direccion,
      };
    },
    async updateJugador() {
      try {
        const response = await this.$http.put(`/jugador/${this.editingJugadorId}`, this.formData);
        console.log(response.data.msg);
        this.fetchJugadores();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el jugador', error);
      }
    },
    async deleteJugador(jugadorId) {
      try {
        const response = await this.$http.delete(`/jugador/${jugadorId}`);
        console.log(response.data.msg);
        this.fetchJugadores();
      } catch (error) {
        console.error('Error al eliminar el jugador', error);
      }
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombre: '',
        direccion: '',
      };
    },
    highlightRow(event) {
      event.currentTarget.style.backgroundColor = '#cceeff';
    },
    unhighlightRow(event) {
      event.currentTarget.style.backgroundColor = '';
    },
  },
  mounted() {
    this.fetchJugadores();
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
