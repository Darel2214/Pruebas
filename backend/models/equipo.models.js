const { model, Schema } = require("mongoose");

const EquipoSchema = new Schema({ 
 

  nombreequipo: { type: Date, required:true  },
  idJugador: {type: Schema.Types.ObjectId, ref:"Jugador"},
  
});

module.exports = model("Equipo", EquipoSchema);
