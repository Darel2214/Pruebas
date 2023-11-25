<template>
  <div>
    <h1 class="text-success">Equipos</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Equipo</button>
    </div>

    <!-- Lista de equipos en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Nombre del Equipo</th>
          <th>Jugador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipo in equipos" :key="equipo._id">
          <td>{{ equipo.nombreequipo }}</td>
          <td>{{ equipo.idJugador.nombre }}</td>
          <td>
            <button @click="editEquipo(equipo)" class="btn btn-warning">Editar</button>
            <button @click="deleteEquipo(equipo._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Equipo' : 'Agregar Equipo' }}</h2>
      <form @submit.prevent="isEditing ? updateEquipo() : createEquipo()">
        <div class="form-group">
          <label for="nombreequipo">Nombre del Equipo</label>
          <input v-model="formData.nombreequipo" type="text" id="nombreequipo" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="idJugador">Jugador</label>
          <select v-model="formData.idJugador" id="idJugador" required class="form-control">
            <option value="" disabled>Selecciona un Jugador</option>
            <option v-for="jugador in listaJugadores" :key="jugador._id" :value="jugador._id">{{ jugador.nombre }}</option>
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
      equipos: [],
      showForm: false,
      formData: {
        nombreequipo: '',
        idJugador: '',
      },
      isEditing: false,
      editingEquipoId: null,
      listaJugadores: [], // Debes cargar la lista de jugadores desde tu API
    };
  },
  methods: {
    async fetchEquipos() {
      try {
        const response = await this.$http.get('/equipo');
        this.equipos = response.data.equipo;
      } catch (error) {
        console.error('Error al obtener los equipos', error);
      }
    },
    async fetchJugadores() {
      try {
        const response = await this.$http.get('/jugador'); // Reemplaza con la ruta correcta para obtener jugadores
        this.listaJugadores = response.data.jugador;
      } catch (error) {
        console.error('Error al obtener los jugadores', error);
      }
    },
    async createEquipo() {
      try {
        const response = await this.$http.post('/equipo', this.formData);
        console.log(response.data.msg);
        this.fetchEquipos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar el equipo', error);
      }
    },
    async updateEquipo() {
      try {
        const response = await this.$http.put(`/equipo/${this.editingEquipoId}`, this.formData);
        console.log(response.data.msg);
        this.fetchEquipos();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar el equipo', error);
      }
    },
    async deleteEquipo(equipoId) {
      try {
        const response = await this.$http.delete(`/equipo/${equipoId}`);
        console.log(response.data.msg);
        this.fetchEquipos();
      } catch (error) {
        console.error('Error al eliminar el equipo', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        nombreequipo: '',
        idJugador: '',
      };
    },
    editEquipo(equipo) {
      this.showForm = true;
      this.isEditing = true;
      this.editingEquipoId = equipo._id;
      this.formData = {
        nombreequipo: equipo.nombreequipo,
        idJugador: equipo.idJugador._id,
      };
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        nombreequipo: '',
        idJugador: '',
      };
    },
  },
  mounted() {
    this.fetchEquipos();
    this.fetchJugadores();
  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
