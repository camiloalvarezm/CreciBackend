const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['LIDER', 'DESARROLLADOR'],
    message: '{VALUE} no es un rol válido.'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//No regresar la contraseña
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Ejecuctar las validaciones
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único.'
})

//Exportar modulo
module.exports = mongoose.model('Usuario', usuarioSchema);
