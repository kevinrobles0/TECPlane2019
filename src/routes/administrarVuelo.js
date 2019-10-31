const express= require('express');
const router = express.Router();
const vuelo = require("../models/vuelo");
const aerolinea = require("../models/aerolinea");

router.post('/administrador/vueloCrear', async(req,res)=>{

    var idVuelo = req.body.id;
    var nombre = req.body.nombre;
    var origen = req.body.origen;
    var destino = req.body.destino;
    var fechaIda = req.body.ida;
    var fechaVuelta = req.body.vuelta;
    var precio = req.body.precio;
    var restricciones = req.body.restricciones;
    var servicios = req.body.servicios;
    var maximo = req.body.maximo;
    var disponibles = maximo;
    var boletos = [];
    var nombreAerolinea = req.body.nombreAerolinea;

    var exito=[];
    var errors =[];

    if(!idVuelo){
        errors.push({text:"Debe ingresar el nombre de aerolinea"});
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
    if(fechaIda> fechaVuelta){
        errors.push({text:"EL orden de las fechas es incorrecto"});
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
    if(!maximo){
        errors.push({text:"Debe ingresar el maximo de boletos"});
    }
    if(!nombreAerolinea){
        errors.push({text:"Debe ingresar el nombre de la aerolínea"});
    }else{
        const resultado = await aerolinea.findOne({nombre: nombreAerolinea});
        if(!resultado){
            var noEncontrado = [{text:"La aerolínea ingresado no corresponde a una existente"}];
            res.render("./administrador/vueloCrear",{
                noEncontrado
            });
            return;
        }
    }
    if(errors.length>0){
        res.render("./administrador/vueloCrear",{
            errors
        });
    }else{
        await vuelo.findOne({idVuelo:idVuelo},async(err,encontrado)=>{
            if(encontrado){
                errors.push("El vuelo ingresada ya existe");
                res.render("./administrador/vueloCrear",{
                    errors
                });
                return;
            }
        })
        var rest = String(restricciones);
        restricciones = rest.split(",");

        var serv = String(servicios);
        servicios = rest.split(",");

        var i = 0;
        while(i<= maximo){
            //[0]numero , [1] estado,[2]cliente
            boletos.push([i,"LIBRE",""]);
            i+=1;
        }
        boletos[0]=null;
        const Nvuelo = new vuelo({idVuelo,nombre,origen,destino,fechaIda,fechaVuelta,precio,restricciones,servicios,maximo,disponibles,boletos,nombreAerolinea});
        Nvuelo.save();
        console.log(Nvuelo)
        exito.push({text:"Se ha insertado el vuelo con éxito"});
        res.render("./administrador/vuelo",{
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
        await vuelo.deleteOne({idVuelo:ingresadoid}, (err)=>{
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

router.post('/administrador/vueloActualizar',async(req,res)=>{
    var actual = req.body.actual;
    var idVuelo = req.body.idVuelo;
    var nombre = req.body.nombre;
    var origen = req.body.origen;
    var destino = req.body.destino;
    var fechaIda = req.body.ida;
    var fechaVuelta = req.body.vuelta;
    var precio = req.body.precio;
    var restricciones = req.body.restricciones;
    var servicios = req.body.servicios;
    var estado = req.body.estado;
    var maximo = req.body.maximo;
    var nombreAerolinea = req.body.nombreAerolinea;

    var errors=[];
    var exito = [];

    if(!actual){
        errors.push({text: "Ingrese identificador del vuelo a actualizar"});
        res.render("./administrador/vueloActualizar",{
            errors
        });
    }else{
        await vuelo.findOne({idVuelo:actual},async(err,vue)=>{
            if(err){
                console.log(err);
            }else{
                if(!vue){
                    errors.push({text:"El identificador del vuelo no corresponde a los existentes"})
                    res.render("./administrador/vueloActualizar",{
                        errors
                    });
                }else{
                    var contador = 0;

                    if(idVuelo){
                        vue.idVuelo = idVuelo;
                        contador+=1;
                    }
                    if(nombre){
                        vue.nombre = nombre;
                        contador+=1;
                    }
                    if(nombreAerolinea){
                        const resultado = await aerolinea.findOne({nombre: nombreAerolinea});
                        if(!resultado){
                            var noEncontrado = [{text:"La aerolínea ingresado no corresponde a una existente"}];
                            res.render("./administrador/vueloActualizar",{
                                noEncontrado
                            });
                            return;
                        }
                        if(resultado){
                            vue.nombreAerolinea = nombreAerolinea;
                            contador+=1;
                        }
                    }
                    if(origen){
                        vue.origen = origen;
                        contador+=1;
                    }
                    if(destino){
                        vue.destino = destino;
                        contador+=1;
                    }
                    if(fechaIda){
                        vue.fechaIda = fechaIda;
                        contador+=1;
                    }
                    if(fechaVuelta){
                        vue.fechaVuelta = fechaVuelta;
                        contador+=1;
                    }
                    if(precio){
                        vue.precio = precio;
                        contador+=1;
                    }
                    if(restricciones){
                        var rest = String(restricciones);
                        restricciones = rest.split(",");
                        vue.restricciones = restricciones;
                        contador+=1;
                    }
                    if(servicios){
                        var rest = String(restricciones);
                        restricciones = rest.split(",");
                        vue.servicios = servicios;
                        contador+=1;
                    }
                    if(estado != "."){
                        vue.estado = estado;
                        contador+=1;
                        console.log("here");
                    }
                    if(maximo){

                        if(parseInt(maximo) > parseInt(vue.maximo)){
                            var diferencia = parseInt(maximo)-parseInt(vue.maximo);
                            console.log(diferencia);
                            var i = parseInt(vue.maximo)+1;
                            while(i<=parseInt(maximo)){
                                vue.boletos.push([i,"LIBRE",""])
                                i+=1;
                            }
                            vue.disponibles = String(parseInt(diferencia)+parseInt(vue.disponibles));
                            contador+=1;
                        }else if(parseInt(maximo) < parseInt(vue.maximo)){
                            errors.push({text:"No se puede modificar la cantidad máxima por un número menor al actual"});
                            res.render("./administrador/vueloActualizar",{
                                errors
                            });
                            return;
                        }
                    }
                    if(contador==0){
                        errors.push({text:"Debe editar al menos un dato"});
                        res.render("./administrador/vueloActualizar",{
                            errors
                        });
                    }else{
                        vue.save();
                        exito.push({text: "Se actualizó con éxito"});
                        res.render("./administrador/vuelo",{
                            exito
                        });
                    }
                }
            }
        })
    }
})

router.post('/administrador/vueloLeer',async(req,res)=>{
    var ingresado = req.body.ingresado;
    var errors = [];
    if(ingresado){
        const vuelos =await vuelo.findOne({idVuelo: ingresado});
        if(vuelos){
            res.render("./administrador/all-vuelos",{vuelos});
        }
        else{
            errors.push({text:"No existe vuelo con ese identificador"});
            res.render("./administrador/vueloLeer",{errors});
        }
    }
    else{
        const vuelos = await vuelo.find();
        res.render("./administrador/all-vuelos",{vuelos});
    }
})

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