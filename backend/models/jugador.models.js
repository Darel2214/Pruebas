const { Schema, model } = require('mongoose');

const JugadorSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  fecha: { type: Date }
});

module.exports = model("Jugador", JugadorSchema);
