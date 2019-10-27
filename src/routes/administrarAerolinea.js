const express= require('express');
const router = express.Router();
const aerolinea = require("../models/aerolinea");
const aeropuertos = require("../models/aeropuerto");

router.post('/administrador/aerolineaCrear',async(req,res)=>{
    var nombre = req.body.nombre;
    var lugares = req.body.lugares;
    var idAerolinea = req.body.idAerolinea;
    var nombreAeropuerto = req.body.aeropuerto;

    var exito=[];
    var errors =[];
    var noAeropuerto=[];

    if(!nombre){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!idAerolinea){
        errors.push({text:"Debe ingresar el id de la aerolinea"});
    }
    if(!nombreAeropuerto){
        errors.push({text:"Debe ingresar el aeropuerto"});
    }
    if(!lugares){
        errors.push({text:"Debe ingresar los paises"});
    }
    if(errors.length>0){
        res.render("./administrador/aerolineaCrear",{
            errors
        });
    }
    
    else{

        aropuerto.findOne({nombre:nombreAeropuerto}, async (err,nombreEncontrado)=>{
            console.log(nombreEncontrado)
            if(!nombreEncontrado){
                noAeropuerto.push("El aeropuerto no corresponde a los existentes");
                res.render("./administrador/aerolineaCrear",{
                    noAeropuerto
                });
            }
            else{
                var paisesTexto = String(lugares);
                var paises = paisesTexto.split(",");

                const Naerolinea = new aerolinea({idAerolinea,nombre,paises,nombreAeropuerto});
                Naerolinea.save();
                exito.push({text:"Se ha insertado la aerolínea con éxito"});
                res.render("./administrador/aerolinea",{
                    exito
                });
            }
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

//update
router.post('/administrador/aerolineaActualizar', async (req,res)=>{
    
    var viejo= req.body.viejo;
    var Innombre = req.body.nombre;
    var lugares = req.body.lugares;
    var idAerolinea = req.body.idAerolinea;
    var nombreAeropuerto = req.body.aeropuerto;
    var noAeropuerto=[];

    if(!Innombre){
        sinNombre.push({text: "Ingrese el nombre de la aerolinea a actualizar"});
        res.render("./administrador/aerolineaActualizar",{
            sinNombre
        });
    }
    else{
        await aerolinea.findOne({nombre : viejo}, async (err, Aerolinea)=>{
            if (err){
                res.send("error");
            } 
            else{

                if(!Aerolinea){
                    noEncontrado.push({text:"El nombre de la aerolinea no corresponde a los existentes"})
                    res.render("./administrador/aerolineaActualizar",{
                        noEncontrado
                    });
                }
                else{
                    console.log(Aerolinea);
                    var contador=0;

                    if(Innombre){
                        Aerolinea.nombre=Innombre;
                        contador+=1;
                    }
                    if(idAerolinea){
                        Aerolinea.idAerolinea=idAerolinea;
                        contador+=1;
                    }
                    if(nombreAeropuerto){
                        
                        aropuerto.findOne({nombre:nombreAeropuerto}, async (err,nombreEncontrado)=>{
                            console.log(nombreEncontrado)
                            if(!nombreEncontrado){
                                noAeropuerto.push("El aeropuerto no corresponde a los existentes");
                            }
                            else{
                                Aerolinea.nombreAeropuerto=nombreAeropuerto;
                                contador+=1
                            }
                        });
                    }

                    if(lugares){
                        var paisesTexto = String(lugares);
                        var paises = paisesTexto.split(",");

                        Aerolinea.paises=paises;
                        contador+=1
                    }

                    if(contador==0){
                        noIngresado.push({text:"Debe editar al menos un dato"});
                        res.render("./administrador/aerolineaActualizar",{
                            noIngresado
                        });
                    }
                    if(noAeropuerto.length==0){
                        res.render("./administrador/aerolineaActualizar",{
                            noAeropuerto
                        });
                    }
                    else{
                        console.log("here")
                        console.log(Aerolinea)
                        Aerolinea.save();
                        console.log("exito");
                        exito.push({text: "Se actualizó con éxito"});
                        res.render("./administrador/aerolinea",{
                            exito
                        });
                        
                    }
                }
            }
        });
    }
});





//read
router.post('/administrador/aerolineaLeer',async(req,res)=>{
    var ingresado =req.body.ingresado;
    console.log(ingresado);
    if(ingresado){
        var noEncontrado=[];
        const resultadoFinal =await aerolinea.findOne({nombre: ingresado});
        console.log(resultadoFinal)
        if(resultadoFinal){
            res.render("./administrador/all-aerolineas",{resultadoFinal});
        }
        else{
            noEncontrado.push({text:"No existe la aerolinea con ese nombre"});
            res.render("./administrador/aerolineaLeer",{noEncontrado});
        }
    }
    else{
        console.log("abajo")
        const aerolineas = await aerolinea.find();
        res.render("./administrador/all-aerolineas",{aerolineas});
    }

});


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