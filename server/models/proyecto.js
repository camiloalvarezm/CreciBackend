var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido."],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es necesaria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }]
});

//Ejecuctar las validaciones
proyectoSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser único.",
});

module.exports = mongoose.model("Proyecto", proyectoSchema);
