const express= require('express');
const router = express.Router();
const aerolinea = require("../models/aerolinea");


router.post('/administrador/aerolineaCrear',async(req,res)=>{
    var nombre = req.body.nombre;
    var paises = req.body.lugares;
    var idAerolinea = req.body.idAerolinea;
    var aeropuerto = req.body.aeropuerto;

    var exito=[];
    var errors =[];

    if(!nombre){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!idAerolinea){
        errors.push({text:"Debe ingresar el id de la aerolinea"});
    }
    if(!aeropuerto){
        errors.push({text:"Debe ingresar el aeropuerto"});
    }
    if(!paises){
        errors.push({text:"Debe ingresar los paises"});
    }
    if(errors.length>0){
        res.render("./administrador/aerolineaCrear",{
            errors
        });
    }
    else{
        
        var IdAeropuerto="";
        var arrayLugares = aeropuerto

        const Naerolinea = new aerolinea({idAerolinea,nombre,paises,IdAeropuerto});
        Naerolinea.save();
        exito.push({text:"Se ha insertado la aerolínea con éxito"});
        res.render("./administrador/aerolinea",{
            exito
        });
    }

});

router.post('/administrador/aerolineaEliminar', async (req,res) =>{
    var exito=[];
    var errors =[];
    var ingresadonombre = req.body.ingresado;

    if(!ingresadonombre){
        errors.push({text:"Debe ingresar el nombre de la aerolínea"});
    } 
    if(errors.length>0){
        res.render("./administrador/aerolineaEliminar",{
            errors,
            ingresadonombre            
        });
    }else{
        await aerolinea.deleteOne({nombre:ingresadonombre}, (err)=>{
            if(err){
                console.log(err);
            } else{
                exito.push({text:"Se ha eliminado la aerolínea con éxito"});
                res.render("./administrador/aerolinea",{
                exito
                });
            }
        })
    }
})


router.get('/administrador/aerolinea/crear', (req,res)=>{
    res.render("administrador/aerolineaCrear");
})

router.get('/administrador/aerolinea/eliminar', (req,res)=>{
    res.render("administrador/aerolineaEliminar");
})

router.get('/administrador/aerolinea/actualizar', (req,res)=>{
    res.render("administrador/aerolineaActualizar");
})

router.get('/administrador/aerolinea/leer', (req,res)=>{
    res.render("administrador/aerolineaLeer");
})



module.exports = router;