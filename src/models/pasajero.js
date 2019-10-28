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