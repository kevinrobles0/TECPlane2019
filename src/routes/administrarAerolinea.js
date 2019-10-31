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
    }else{
        await aerolinea.findOne({idAerolinea:idAerolinea},async(err,encontrado)=>{
            if(encontrado){
                errors.push("La aerolínea ingresada ya existe");
                res.render("./administrador/aerolineaCrear",{
                    errors
                });
                return;
            }
        })

        await aeropuertos.findOne({nombre:nombreAeropuerto}, async (err,nombreEncontrado)=>{
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
    var ingresado = req.body.ingresado;

    if(!ingresado){
        errors.push({text:"Debe ingresar el identificador de la aerolínea"});
    } 
    if(errors.length>0){
        res.render("./administrador/aerolineaEliminar",{
            errors,
            ingresado            
        });
    }else{
        await aerolinea.deleteOne({idAerolinea:ingresado}, (err)=>{
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
    var errors=[];
    var exito = [];

    if(!viejo){
        errors.push({text: "Ingrese identificador de la aerolínea a actualizar"});
        res.render("./administrador/aerolineaActualizar",{
            errors
        });
    }
    else{
        await aerolinea.findOne({idAerolinea : viejo}, async (err, Aerolinea)=>{
            if (err){
                res.send("error");
            } 
            else{

                if(!Aerolinea){
                    errors.push({text:"El identificador de la aerolinea no corresponde a los existentes"})
                    res.render("./administrador/aerolineaActualizar",{
                        errors
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
                                errors.push("El aeropuerto no corresponde a los existentes");
                                res.render("./administrador/aerolineaActualizar",{
                                    errors
                                });
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
                        errors.push({text:"Debe editar al menos un dato"});
                        res.render("./administrador/aerolineaActualizar",{
                            errors
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
    if(ingresado){
        var noEncontrado=[];
        const aerolineas =await aerolinea.findOne({idAerolinea: ingresado});
        if(aerolineas){
            res.render("./administrador/all-aerolineas",{aerolineas});
        }
        else{
            noEncontrado.push({text:"No existe la aerolinea con ese identificador"});
            res.render("./administrador/aerolineaLeer",{noEncontrado});
        }
    }
    else{
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