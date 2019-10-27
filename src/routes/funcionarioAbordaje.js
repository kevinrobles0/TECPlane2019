const express= require('express');
const router = express.Router();

router.get('/funcionario/funcionarioAbordaje', (req,res)=>{
    res.render("funcionario/funcionarioAbordaje");
})

router.post('/funcionario/abordar', (req,res)=>{
    
    var cedula = req.body.cedula;
    var numeroVuelo = req.body.numeroVuelo;

    var sinDatos=[];

    if(!cedula){
        sinDatos.push({text:"Debe ingresar el número de cédula"});
    }
    if(!numeroVuelo){
        sinDatos.push({text:"Debe ingresar el vuelo"});
    }

    if(sinDatos.length>0){
        res.render("funcionario/funcionarioAbordaje",{sinDatos});
    }
    else{

        //Poner la funcion de abordaje

    }
})

module.exports = router;