const express= require('express');
const router = express.Router();
const aerolinea = require("../models/aerolinea");

router.post('/administrador/aerolineaCrear',async(req,res)=>{
    var nombre = req.body.nombre;
    var lugar1 = req.body.lugar1;
    var lugar2 = req.body.lugar2;
    var lugar3 = req.body.lugar3;

    var exito=[];
    var errors =[];

    if(!nombre){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!lugar1){
        errors.push({text:"Debe ingresar el lugar1"});
    }
    if(!lugar2){
        errors.push({text:"Debe ingresar el lugar2"});
    }
    if(!lugar3){
        errors.push({text:"Debe ingresar el lugar3"});
    }
    if(errors.length>0){
        res.render("./administrador/aerolineaCrear",{
            errors,
            nombre,
            lugar1,
            lugar2,
            lugar3 
        });
    }else{
        const Naerolinea = new aerolinea({nombre,lugar1,lugar2,lugar3});
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