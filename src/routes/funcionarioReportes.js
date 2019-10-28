const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");

router.get('/funcionario/funcionarioReportes', (req,res)=>{
    res.render("funcionario/funcionarioReportes");
});

router.get('/funcionario/reporte/pasajero', (req,res)=>{
    res.render("funcionario/reportePasajero");
});

router.get('/funcionario/reporte/vuelos', (req,res)=>{
    res.render("funcionario/reporteVuelos");
});

router.post('/funcionario/elegirfiltro', (req,res)=>{
   
    var eleccion=String(req.body.filtro);

    console.log(eleccion)

    if(eleccion=="Rango de fechas"){
        //redireccionar a filtro
    }

    if(eleccion=="Estado"){
        //redireccionar a filtro
    }

    if(eleccion=="Nombre de pasajero"){
        //redireccionar a filtro
    }

});

router.post('/funcionario/consultarPasajero', (req,res)=>{
    
    var cedulaIngresada = req.body.ingresado;
    var noIngresado=[];
    var noEncontrado=[];

    if(!cedulaIngresada){
        noIngresado.push({text: "Debe ingresar la cédula del pasajero"});
        res.render("funcionario/funcionarioCheck-in",{noIngresado});
    }
    else{
        pasajeros.findOne({idPasajero:cedulaIngresada}, async (err,pasajeroEncontrado)=>{
            console.log(pasajeroEncontrado)
            if(!pasajeroEncontrado){
                noEncontrado.push("El pasajero no corresponde a los registrados");
                res.render("funcionario/reportePasajero",{noEncontrado});
            }
            else{
                res.render("funcionario/mostrarPasajeroReportes",{pasajeroEncontrado});
            }
        });
    }

});

module.exports = router;