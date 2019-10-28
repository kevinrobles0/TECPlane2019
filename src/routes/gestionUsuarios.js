const express= require('express');
const router = express.Router();
const cliente = require("../models/pasajero");

router.post('/cliente/usuarioCrear',async(req,res)=>{
    var idPasajero= req.body.cedula;
    var nombre= req.body.nombre;
    var FechaNacimiento=req.body.nacimiento;
    var nacionalidad=req.body.nacionalidad;
    var residencia= req.body.residencia;
    var telefonos= req.body.telefono;
    var correo= req.body.correo;
    var contraseña= req.body.contraseña;

    var exito=[];
    var errores=[];

    if(!idPasajero){
        errores.push({text:"Debe ingresar la cédula"});
    }
    if(!nombre){
        errores.push({text:"Debe ingresar el nombre"});
    }
    if(!FechaNacimiento){
        errores.push({text:"Debe ingresar la fecha de nacimiento"});
    }
    if(!residencia){
        errores.push({text:"Debe ingresar la residencia"});
    }
    if(!telefonos){
        errores.push({text:"Debe ingresar el teléfono"});
    }
    if(!correo){
        errores.push({text:"Debe ingresar el correo electrónico"});
    }
    if(!contraseña){
        errores.push({text:"Debe ingresar la contraseña"});
    }
    if(errores.length>0){
        res.render("./cliente/usuarioCrear",{
            errores,
            idPasajero,
            nombre,
            FechaNacimiento,
            residencia,
            telefonos,
            correo,
            contraseña
        });
    } else{
        const noUsuario= new cliente ({idPasajero,nombre,FechaNacimiento,nacionalidad,residencia,telefonos,correo,contraseña});
        noUsuario.save();
        exito.push({text:"Se creo el usuario de manera exitosa"});
        res.render("./indexapp",{
            exito
        });
        
       
    }
})
router.get('/cliente/usuarios/crear', (req,res)=>{
    res.render("cliente/usuarioCrear");
})
router.get('/cliente/usuarios/consultar', (req,res)=>{
    res.render("cliente/usuarioConsultar");
})

router.get('/cliente/usuarios/eliminar', (req,res)=>{
    res.render("cliente/usuarioEliminar");
})

router.get('/cliente/usuarios/actualizar', (req,res)=>{
    res.render("cliente/usuarioActualizar");
})


module.exports = router;