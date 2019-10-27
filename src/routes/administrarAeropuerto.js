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
    var sinNombre=[];
    var noIngresado=[];
    var noEncontrado=[];
    var exito=[];
    

    if(!viejo){
        sinNombre.push({text: "Ingrese el nombre del aeropuerto a actualizar"});
        res.render("./administrador/aeropuertoActualizar",{
            sinNombre
        });
    }
    else{
        await aeropuerto.findOne({nombre : viejo}, async (err, Aero)=>{
            if (err){
                console.log("error");
            } else{
                if(!Aero){
                    noEncontrado.push({text:"El nombre del aeropuerto no corresponde a los existentes"})
                    res.render("./administrador/aeropuertoActualizar",{
                        noEncontrado
                    });
                }
                else{
                    console.log(Aero);
                    var contador=0;
                    var textoActualizado=""

                    if(nombre){
                        Aero.nombre=nombre;
                        contador+=1;
                    }
                    if(localizacion){
                        Aero.localizacion=localizacion;
                        contador+=1;
                    }
                    if(contacto){
                        Aero.contacto=contacto;
                        contador+=1;
                    }
                    if(sitio){
                        Aero.sitioWeb=sitio;
                        contador+=1;
                    }

                    if(contador==0){
                        noIngresado.push({text:"Debe editar al menos un dato"});
                        res.render("./administrador/aeropuertoActualizar",{
                            noIngresado
                        });
                    }
                    else{
                        console.log("here")
                        console.log(Aero)
                        Aero.save();
                        console.log("exito");
                        exito.push({text: "Se actualizó con éxito"});
                        res.render("./administrador/aeropuerto",{
                            exito
                        });
                        
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
router.post('/administrador/aeropuertoLeer',async (req,res) =>{
    var ingresado =req.body.ingresado;
    console.log(ingresado);
    if(ingresado){
        const resultadoFinal =await aeropuerto.find({nombre: ingresado});
        res.render("./administrador/all-aeropuertos",{resultadoFinal});
        
        
    }
    else{
        console.log("abajo")
        const aeropuertos = await aeropuerto.find();
        res.render("./administrador/all-aeropuertos",{aeropuertos});
    }

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