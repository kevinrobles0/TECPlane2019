const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const fechasEsquema = new Schema({
fechaInicio:{
    type: Date,
    requeried: true
},
fechaFin:{
    type: Date,
    requeried: true
}});

module.exports = mongoose.model("fechas",fechasEsquema)