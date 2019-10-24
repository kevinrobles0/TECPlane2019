const mongoose = require('mongoose');
const { Schema } =mongoose;

const aeropuertoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    localizacion:{
        type: String,
        requeried: true,
    },
    contacto:{
        type: String,
        requeried: true
    },
    sitioWeb:{
        type: String,
        requeried: true
    }
});

module.exports = mongoose.model("aeropuertos",aeropuertoSchema)