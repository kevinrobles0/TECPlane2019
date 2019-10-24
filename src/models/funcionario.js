const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const funcionarioSchema = new Schema({
    idFuncionario:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        requeried: true
    },
    FechaContratacion:{
        type: Date,
        requeried: true
    },
    AreaTrabajo:{
        type: Array,
        requeried: true
    },
    correo:{
        type: String,
        requeried: true
    },
    contraseña:{
        type: String,
        required: true, 
        trim: true
    }
});

module.exports = mongoose.model("funcionario",funcionarioSchema)