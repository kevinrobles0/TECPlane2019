const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const pasajeroSchema = new Schema({
    idPasajero:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    FechaNacimiento:{
        type: Date,
        requeried: true
    },
    residencia:{
        type: String,
        requeried: true
    },
    telefonos:{
        type: Array,
        requeried: true,
        
    },
    correo:{
        type: String,
        requeried: true,
        unique:true
    },
    contraseña:{
        type: String,
        required: true, 
        trim: true
    }
});

module.exports = mongoose.model("pasajero",pasajeroSchema)