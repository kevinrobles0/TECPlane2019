const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcrypt');

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
    },
    infoCompra:{
        type:Array,
        default:[]
    }
});

pasajeroSchema.pre('save',function(next){
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

module.exports = mongoose.model("pasajero",pasajeroSchema)