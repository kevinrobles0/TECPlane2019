const express= require('express');
const router = express.Router();
const funcionario = require("../models/funcionario");
const pasajero = require("../models/pasajero");
const bcrypt = require('bcrypt');


const correoPrueba=require("../config/props");


router.post('/Indexapp',async(req,res)=>{
    var correoEntrada = req.body.correo;
    var contraseñaEntrada = req.body.contraseña;
    var errors =[];
    var contraseñaEncontrada = "";
    var tipo;

    correoPrueba.correo=correoEntrada;

    await funcionario.findOne({correo:correoEntrada}, async(err,funcio)=>{
        if(err){
            console.log(err);
        }
        if(funcio){
            tipo = funcio.tipo;
            contraseñaEncontrada = funcio.contraseña;
        }
    })

    await pasajero.findOne({correo:correoEntrada}, async(err,pasaj)=>{
        if(err){
            console.log(err);
        }
        if(pasaj){
            tipo = "pasajero";
            contraseñaEncontrada = pasaj.contraseña;  
        }
    })


    await bcrypt.compare(contraseñaEntrada, contraseñaEncontrada, async(err, resp)=>{
        if(err){
            console.log(err);
        }
        if(contraseñaEncontrada==""){
            errors.push({text:"Usuario incorrecto"});
            res.render("./indexapp",{
            errors
            })
            return;
        }

        if(resp){
            
            if(tipo=="Administrativo"){
                console.log("admi");
                res.render("./indexAdministrador");
            }else if(tipo=="pasajero"){
                console.log("pasaj");
                res.render("./indexCliente");
            }else{
                console.log("funci");
                res.render("./indexFuncionario");
            }
        }else{
            errors.push({text:"contraseña incorrecta"});
            res.render("./indexapp",{
            errors
            })
        } 
    });
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

router.get('/funcionario', (req,res)=>{
    res.render('indexFuncionario');
})

module.exports = router;