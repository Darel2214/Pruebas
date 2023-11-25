<template>
  <div>
    <h1 class="text-success">Membresia</h1>
    <div class="mt-4">
      <button @click="showCreateForm" class="btn btn-primary">Agregar Membresia</button>
    </div>

    <!-- Lista de membresías en una tabla -->
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>Fecha de Inicio</th>
          <th>Fecha Final</th>
          <th>Club de Fútbol</th>
          <th>Jugador</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="membresia in membresias" :key="membresia._id">
          <td>{{ formatFecha(membresia.fechainicio) }}</td>
          <td>{{ formatFecha(membresia.fechafinal) }}</td>
          <td>{{ membresia.idClubFutbol.nombreclub }}</td>
          <td>{{ membresia.idJugador.nombre }}</td>
          <td>{{ membresia.activa ? 'Activa' : 'No Activa' }}</td>
          <td>
            <button @click="editMembresia(membresia)" class="btn btn-warning">Editar</button>
            <button @click="deleteMembresia(membresia._id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de creación/editar -->
    <div v-if="showForm">
      <h2>{{ isEditing ? 'Editar Membresia' : 'Agregar Membresia' }}</h2>
      <form @submit.prevent="isEditing ? updateMembresia() : createMembresia()">
        <div class="form-group">
          <label for="fechainicio">Fecha de Inicio</label>
          <input v-model="formData.fechainicio" type="date" id="fechainicio" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="fechafinal">Fecha Final</label>
          <input v-model="formData.fechafinal" type="date" id="fechafinal" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="idClubFutbol">Club de Fútbol</label>
          <select v-model="formData.idClubFutbol" id="idClubFutbol" required class="form-control">
            <option value="" disabled>Selecciona un Club de Fútbol</option>
            <option v-for="club in listaClubes" :key="club._id" :value="club._id">{{ club.nombreclub }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="idJugador">Jugador</label>
          <select v-model="formData.idJugador" id="idJugador" required class="form-control">
            <option value="" disabled>Selecciona un Jugador</option>
            <option v-for="jugador in listaJugadores" :key="jugador._id" :value="jugador._id">{{ jugador.nombre }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="activa">Estado</label>
          <select v-model="formData.activa" id="activa" required class="form-control">
            <option value="true">Activa</option>
            <option value="false">No Activa</option>
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
      membresias: [],
      showForm: false,
      formData: {
        fechainicio: '',
        fechafinal: '',
        idClubFutbol: '',
        idJugador: '',
        activa: 'true',
      },
      isEditing: false,
      editingMembresiaId: null,
      listaClubes: [], // Debes cargar la lista de clubes desde tu API
      listaJugadores: [], // Debes cargar la lista de jugadores desde tu API
    };
  },
  methods: {
    
  formatFecha(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString();
  },
    async fetchClubes() {
    try {
      const response = await this.$http.get('/clubfutbol'); // Cambia la ruta según tu API
      this.listaClubes = response.data.clubFutbol; // Asegúrate de asignar correctamente los datos recibidos a listaClubes
    } catch (error) {
      console.error('Error al obtener los clubes de fútbol', error);
    }
  },

  async fetchJugadores() {
    try {
      const response = await this.$http.get('/jugador'); // Cambia la ruta según tu API
      this.listaJugadores = response.data.jugador; // Asegúrate de asignar correctamente los datos recibidos a listaJugadores
    } catch (error) {
      console.error('Error al obtener los jugadores', error);
    }
  },
    async fetchMembresias() {
      try {
        const response = await this.$http.get('/membresia');
        this.membresias = response.data.membresia;
      } catch (error) {
        console.error('Error al obtener las membresias', error);
      }
    },
    async createMembresia() {
      try {
        const response = await this.$http.post('/membresia', this.formData);
        console.log(response.data.msg);
        this.fetchMembresias();
        this.showForm = false;
      } catch (error) {
        console.error('Error al agregar la membresia', error);
      }
    },
    async updateMembresia() {
      try {
        const response = await this.$http.put(`/membresia/${this.editingMembresiaId}`, this.formData);
        console.log(response.data.msg);
        this.fetchMembresias();
        this.showForm = false;
      } catch (error) {
        console.error('Error al actualizar la membresia', error);
      }
    },
    async deleteMembresia(membresiaId) {
      try {
        const response = await this.$http.delete(`/membresia/${membresiaId}`);
        console.log(response.data.msg);
        this.fetchMembresias();
      } catch (error) {
        console.error('Error al eliminar la membresia', error);
      }
    },
    showCreateForm() {
      this.showForm = true;
      this.isEditing = false;
      this.formData = {
        fechainicio: '',
        fechafinal: '',
        idClubFutbol: '',
        idJugador: '',
        activa: 'true',
      };
    },
    editMembresia(membresia) {
      this.showForm = true;
      this.isEditing = true;
      this.editingMembresiaId = membresia._id;
      this.formData = {
        fechainicio: membresia.fechainicio,
        fechafinal: membresia.fechafinal,
        idClubFutbol: membresia.idClubFutbol,
        idJugador: membresia.idJugador,
        activa: membresia.activa.toString(),
      };
    },
    cancelEdit() {
      this.showForm = false;
      this.isEditing = false;
      this.formData = {
        fechainicio: '',
        fechafinal: '',
        idClubFutbol: '',
        idJugador: '',
        activa: 'true',
      };
    },
  },
  mounted() {
    this.fetchMembresias();
    this.fetchClubes(); // Agregar la llamada para cargar la lista de clubes
    this.fetchJugadores(); //

  },
};
</script>

<style scoped>
/* Estilos personalizados o de Bootstrap si es necesario */
</style>
