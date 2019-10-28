const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcrypt');

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

funcionarioSchema.pre('save',function(next){
    const usuario = this;
    if (!usuario.isModified('contraseña')){
        return next();
    }
    bcrypt.genSalt(10, async(err, salt)=>{
        bcrypt.hash(usuario.contraseña, salt, function(err, hash) {
        usuario.contraseña = hash; 
        next();
       });
    });
})

module.exports = mongoose.model("funcionario",funcionarioSchema)