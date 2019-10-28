const express= require('express');
const router = express.Router();
const funcionario =require("../models/aeropuerto");

router.post('/administrador/funcionarioCrear',async(req,res) =>{
    var idFuncionario = req.body.cedula;
    var nombre = req.body.nombre;
    var tipo = req.body.tipo;
    var fechaContratacion = req.body.fechaIngreso;
    var AreaTrabajo = [];
    var correo = req.body.correo;
    var contraseña =req.body.contraseña;

    var exito=[];
    var errors =[];

    if(!idFuncionario ){
        errors.push({text:"Debe ingresar la cédula"});
    }
    if(!nombre ){
        errors.push({text:"Debe ingresar el nombre"});
    }
    if(!tipo ){
        errors.push({text:"Debe ingresar el tipo de funcionario"});
    }
    if(!fechaContratacion ){
        errors.push({text:"Debe ingresar la fecha de ingreso"});
    }
    if(!req.body.counter){
        AreaTrabajo.push(req.body.counter);
    }
    if(!req.body.carga){
        AreaTrabajo.push(req.body.carga);
    }
    if(!req.body.mantenimiento){
        AreaTrabajo.push(req.body.mantenimiento);
    }
    if(!req.body.abordaje){
        AreaTrabajo.push(req.body.abordaje);
    }
    if(!AreaTrabajo){
        errors.push({text:"Debe ingresar el área de trabajo"});
    }
    if(!correo ){
        errors.push({text:"Debe ingresar el correo"});
    }
    if(!contraseña ){
        errors.push({text:"Debe ingresar la contraseña"});
    }
    if(errors.length>0){
        res.render("./administrador/funcionarioCrear",{
            errors,
            idFuncionario,
            nombre,
            tipo,
            fechaContratacion,
            AreaTrabajo,
            correo,
            contraseña
        });
    }else{
        const Nfuncionario = new funcionario({idFuncionario,nombre,tipo,fechaContratacion,AreaTrabajo,correo,contraseña});
        Nfuncionario.save();
        exito.push({text:"Se ingreso el funcionario con éxito"});
        res.render("./administrador/funcionario",{
            exito
        });
    }
    
})

router.post('/administrador/funcionarioEliminar', async (req,res) =>{
    var exito=[];
    var errors =[];
    var idFuncionarioIngresado =req.body.nombreAeliminar;

    if(!idFuncionarioIngresado){
        errors.push({text:"Debe ingresar la cédula del funcionario"});
    } 
    if(errors.length>0){
        res.render("./administrador/funcionarioEliminar",{
            errors,
            idFuncionarioIngresado            
        });
    }

    else{ 
        await funcionario.deleteOne({idFuncionario:idFuncionarioIngresado}, (err)=>{
            if(err){
                console.log(err);
            } else{
                exito.push({text:"Se ha eliminado el funcionario con éxito"});
                res.render("./administrador/funcionario",{
                exito
                });
            }
        })
    }   
});

router.post('administrador/funcionarioActualizar',async(req,res)=>{
    var vieja = req.body.viejacedula;
    var idFuncionario = req.body.cedula;
    var nombre = req.body.nombre;
    var tipo = req.body.tipo;
    var fechaContratacion = req.body.fechaIngreso;
    var AreaTrabajo = [];
    var correo = req.body.correo;
    var contraseña =req.body.contraseña;

    var exito=[];
    var errors =[];

    if(!vieja){
        errors.push({text:"Ingrese la cédula a actualizar"});
        res.render("./administrador/funcionarioActualizar",{erros});
    }
})

router.get('/administrador/funcionario/crear', (req,res)=>{
    res.render("administrador/funcionarioCrear");
})

router.get('/administrador/funcionario/eliminar', (req,res)=>{
    res.render("administrador/funcionarioEliminar");
})

router.get('/administrador/funcionario/actualizar', (req,res)=>{
    res.render("administrador/funcionarioActualizar");
})

router.get('/administrador/funcionario/leer', (req,res)=>{
    res.render("administrador/funcionarioLeer");
})

module.exports = router;