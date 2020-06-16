var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var tareaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido."],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es necesaria"],
  },
  dias: {
    type: Number,
    default: 0
  },
  horas: {
    type: Number,
    default: 0
  },
  minutos: {
    type: Number,
    default: 0
  },
  asignado: {
    type: Boolean,
    default: false,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: "Proyecto",
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

//Ejecuctar las validaciones
tareaSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser único.",
});

module.exports = mongoose.model("Tarea", tareaSchema);
