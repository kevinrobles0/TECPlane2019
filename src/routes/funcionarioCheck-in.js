const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");

router.get('/funcionario/funcionarioCheck-in', (req,res)=>{
    res.render("funcionario/funcionarioCheck-in");
})

router.post('/funcionario/Check-in', (req,res)=>{
    
    var cedulaIngresada = req.body.ingresado;
    var noIngresado=[];
    var noEncontrado=[];

    if(!cedulaIngresada){
        noIngresado.push({text: "Debe ingresar la cédula del pasajero"});
        res.render("funcionario/funcionarioCheck-in",{noIngresado});
    }
    else{
        //Aqui va el código de la búsqueda
    }

})


module.exports = router;