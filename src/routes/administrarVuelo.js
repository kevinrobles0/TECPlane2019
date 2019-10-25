const express= require('express');
const router = express.Router();
const vuelo = require("../models/vuelo");

router.post('/administrador/vueloCrear', async(req,res)=>{
    var idVuelo = req.body.id;
    var nombre = req.body.nombre;
    var origen = req.body.origen;
    var destino = req.body.destino;
    var fechaIda = req.body.ida;
    var fechaVuelta = req.body.vuelta;
    var precio = req.body.precio;
    var restricciones;
    var servicios;
    var estado = req.body.estado;
    var maximo = req.body.maximo;
    var disponibles = maximo;
    var boletos = [];

    var exito=[];
    var errors =[];

    if(!idVuelo){
        errors.push({text:"Debe ingresar el identificador"});
    }
    if(!nombre){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!origen){
        errors.push({text:"Debe ingresar el origen"});
    }
    if(!destino){
        errors.push({text:"Debe ingresar el destino"});
    }
    if(!fechaIda){
        errors.push({text:"Debe ingresar la fecha de ida"});
    }
    if(!fechaVuelta){
        errors.push({text:"Debe ingresar la fecha de regreso"});
    }
    if(!precio){
        errors.push({text:"Debe ingresar el precio"});
    }
    if(!restricciones){
        errors.push({text:"Debe ingresar las restricciones"});
    }
    if(!servicios){
        errors.push({text:"Debe ingresar los servicios"});
    }
    if(!estado){
        errors.push({text:"Debe ingresar el estado"});
    }
    if(!maximo){
        errors.push({text:"Debe ingresar el maximo de boletos"});
    }
    if(errors.length>0){
        res.render("./administrador/vueloCrear",{
            errors
        });
    }else{
        var i = 0;
        while(i<= maximo){
            //[0]numero , [1] estado,[2]cliente
            boletos.push([i,"LIBRE",""]);

        }
        boletos[0]=null;
        const Nvuelo = new vuelo({idVuelo,nombre,origen,destino,fechaIda,fechaVuelta,precio,restricciones,servicios,estado,maximo,disponibles,boletos});
        Nvuelo.save();
        exito.push({text:"Se ha insertado el vuelo con éxito"});
        res.render("./administrador/aeropuerto",{
            exito
        });
    }

})

router.post('/administrador/vueloEliminar', async (req,res) =>{
    var exito=[];
    var errors =[];
    var ingresadoid =req.body.ingresado;

    if(!ingresadoid){
        errors.push({text:"Debe ingresar el identificador del vuelo"});
    } 
    if(errors.length>0){
        res.render("./administrador/vueloEliminar",{
            errors,
            ingresadoid            
        });
    }

    else{ 
        await aeropuerto.deleteOne({idVuelo:ingresadoid}, (err)=>{
            if(err){
                console.log(err);
            } else{
                exito.push({text:"Se ha eliminado el vuelo con éxito"});
                res.render("./administrador/vuelo",{
                exito
                });
            }
        });
    }   
});

router.get('/administrador/vuelo/crear', (req,res)=>{
    res.render("administrador/vueloCrear");
})
router.get('/administrador/vuelo/leer', (req,res)=>{
    res.render("administrador/vueloLeer");
})
router.get('/administrador/vuelo/eliminar', (req,res)=>{
    res.render("administrador/vueloEliminar");
})
router.get('/administrador/vuelo/actualizar', (req,res)=>{
    res.render("administrador/vueloActualizar");
})


module.exports = router;