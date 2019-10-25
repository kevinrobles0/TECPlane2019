const express= require('express');
const router = express.Router();
const funcionario = require("../models/funcionario");
const pasajero = require("../models/pasajero");

router.post('/Indexapp',async(req,res)=>{
    var correoEntrada = req.body.correo;
    var contraseñaEntrada = req.body.contraseña;

    console.log(correoEntrada);

    var exito=[];
    var errors =[];

    var encontrado = 0;

    await funcionario.findOne({correo:correoEntrada,contraseña:contraseñaEntrada}, async(err,funcio)=>{
        if(err){
            console.log(err);
        }
        if(!funcio){
            //No lo encontro
        }else{
            if(funcio.tipo=="Administrador"){
                res.render("./indexAdministrador",{
                    correoEntrada});
            }else{
                //redireccionar otros funcionarios
            }
            encontrado = 1;
            
        }

    })

    await pasajero.findOne({correo:correoEntrada,contraseña:contraseñaEntrada}, async(err,pasaj)=>{
        if(err){
            console.log(err);
        }
        if(!pasaj){
            //No lo encontro
        }else{
            //redireccionar
            console.log("pasajero");
            encontrado = 1;
            
        }
    })
    if(encontrado==0){
        errors.push({text:"Usuario incorrecto"});
        res.render("./indexapp",{
            errors
        })
    }
})


router.get('/', (req,res)=>{
    res.render('Indexapp');
})

router.get('/administrador', (req,res)=>{
    res.render('indexAdministrador');
})

router.get('/cliente', (req,res)=>{
    res.render('indexCliente');
})

module.exports = router;