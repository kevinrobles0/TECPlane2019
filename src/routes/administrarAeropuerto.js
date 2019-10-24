const express= require('express');
const router = express.Router();
const aeropuerto = require("../models/aeropuerto");
 
router.post('/administrador/aeropuertoCrear',async (req,res) =>{
    
    var nombre =req.body.nombre;
    var localizacion =req.body.lugar;
    var sitioWeb =req.body.sitio;
    var contacto =req.body.informacion;

    var exito=[];
    var errors =[];

    if(!nombre){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!localizacion ){
        errors.push({text:"Debe ingresar el lugar"});
    }
    if(!sitioWeb ){
        errors.push({text:"Debe ingresar el sitio"});
    }
    if(!contacto ){
        errors.push({text:"Debe ingresar la información"});
    }
    if(errors.length>0){
        res.render("./administrador/aeropuertoCrear",{
            errors,
            nombre,
            localizacion,
            contacto,
            sitioWeb
        });
    }
    
    else{
        const Naeropuerto=new aeropuerto({nombre,localizacion,contacto,sitioWeb});
        Naeropuerto.save();
        exito.push({text:"Se ha insertado el aeropuerto con éxito"});
        res.render("./administrador/aeropuerto",{
            exito
        });
    }
});
//update
router.post('/administrador/aeropuertoActualizar',async (req,res) =>{
    var viejo =req.body.nombreViejo;
    var nombre =req.body.nuevonombre;
    var localizacion =req.body.nuevolugar;
    var contacto =req.body.nuevainformacion;
    var sitio =req.body.nuevositio;
    const {id}=req.params;
    console.log(id);
    var sinNombre=[];
    var noIngresado=[];
    var noEncontrado=[];
    var exito=[];

    if(!viejo){
        sinNombre.push({text: "Ingrese el nombre de la aerolinea a actualizar"});
        res.render("./administrador/aeropuertoActualizar",{
            sinNombre
        });
    }
    else{
        await aeropuerto.find({nombre : viejo}, async (err, nombreAero)=>{
            if (err){
                console.log("error");
            } else{
                if(nombreAero.length==0){
                    noEncontrado.push({text:"El nombre del aeropuerto no corresponde a los existentes"})
                    res.render("./administrador/aeropuertoActualizar",{
                        noEncontrado
                    });
                }
                else{
                    var textoActualizado=""

                    if(nombre){
                        textoActualizado+="nombre: '"+nombre+"', "
                    }
                    if(localizacion){
                        textoActualizado+="localizacion: '"+localizacion+"', "
                    }
                    if(contacto){
                        textoActualizado+="contacto: '"+contacto+"', "
                    }
                    if(sitio){
                        textoActualizado+="sitioWeb: '"+sitio+"'"
                    }

                    if(textoActualizado=="{}"){
                        noIngresado.push({text:"Debe editar al menos un dato"});
                        res.render("./administrador/aeropuertoActualizar",{
                            noIngresado
                        });
                    }
                    else{
                        await aeropuerto.updateOne({nombre : viejo},{$set: {textoActualizado}}, (err)=>{
                            if(err) { 
                                console.log("MAMON");
                            }
                            else{
                                console.log("exito");
                                exito.push({text: "Se actualizó con éxito"});
                                res.render("./administrador/aeropuerto",{
                                    exito
                                });
                            }
                        })
                    }
                }
            }
        });
    }
});
//delete
router.post('/administrador/aeropuertoEliminar', async (req,res) =>{
    var exito=[];
    var errors =[];
    var ingresadonombre =req.body.ingresado;

    if(!ingresadonombre){
        errors.push({text:"Debe ingresar el nombre del aeropuerto"});
    } 
    if(errors.length>0){
        res.render("./administrador/aeropuertoEliminar",{
            errors,
            ingresadonombre            
        });
    }

    else{ 
        await aeropuerto.deleteOne({nombre:ingresadonombre}, (err)=>{
            if(err){
                console.log(err);
            } else{
                exito.push({text:"Se ha eliminado el aeropuerto con éxito"});
                res.render("./administrador/aeropuerto",{
                exito
                });
            }
        });
    }   
});
//read
router.post('/administrador/aeropuertoLeer',(req,res) =>{
    var ingresado =req.body.ingresado;
    console.log(ingresado);
});







router.get('/administrador/aeropuerto/crear', (req,res)=>{
    res.render("administrador/aeropuertoCrear");
})

router.get('/administrador/aeropuerto/actualizar', (req,res)=>{
    res.render("administrador/aeropuertoActualizar");
})

router.get('/administrador/aeropuerto/eliminar', (req,res)=>{
    res.render("administrador/aeropuertoEliminar");
})

router.get('/administrador/aeropuerto/leer', (req,res)=>{
    res.render("administrador/aeropuertoLeer");
})

module.exports = router;