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
    fechaIda:{
        type: Date,
        requeried: true
    },
    fechaVuelta:{
        type: Date,
        requeried: true
    },
     precio:{
        type: Array,
        requeried: true
    },
    restricciones:{
        type: Array,
        default:[]
    },
    servicios:{
        type: Array,
        default:[]
    },
    estado:{
        type: String,
        requeried: true
    },
    maximo:{
        type: Array,
        requeried: true,
        trim: true
    },
    disponibles:{
        type: Array,
        requeried: true,
        trim: true
    },
    boletos:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model("vuelo",vueloSchema)