const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const vueloSchema = new Schema({
    idVuelo:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    origen:{
        type: String,
        requeried: true
    },
    destino:{
        type: String,
        requeried: true
    },
    itinerario:{
        type: String,
        requeried: true
    },
     precio:{
        type: Int32Array,
        requeried: true
    },
    restricciones:{
        type: Array,
        requeried: true
    },
    servicios:{
        type: Array,
        requeried: true
    },
    estado:{
        type: String,
        requeried: true
    },
    maximo:{
        type: Int32Array,
        requeried: true,
        trim: true
    },
});

module.exports = mongoose.model("vuelo",vueloSchema)