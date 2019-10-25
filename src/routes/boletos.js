const express= require('express');
const router = express.Router();

router.post('/cliente/boletos',async(req,res)=>{
    var origen= req.body.origen;
    var destino= req.body.destino;
    var fechasalida=req.body.fechasalida;
    var fechaentrada=req.body.fechaentrada;

    var exito=[];
    var errores=[];

    if(!origen){
        errores.push({text:"Debe ingresar el origen"});
    }
    if(!destino){
        errores.push({text:"Debe ingresar el destino"});
    }
    if(!fechasalida){
        errores.push({text:"Debe ingresar la fecha de salida "});
    }
    if(!fechaentrada){
        errores.push({text:"Debe ingresar la fecha de entrada"});
    }
    if(errores.length>0){
        res.render("./cliente/boletos",{
            errores,
            origen,
            destino,
            fechasalida,
            fechaentrada
        });
    } else{
        exito.push({text:"Se insertaron los datos correctamente"});
        res.render("./cliente/boletosDisponibles",{
            exito
        })
        
       
    }
})

router.post('/cliente/boletos/seleccionar',async(req,res)=>{
    var boletos= req.body.boletos;
    var maletas= req.body.maletas;
    var observaciones= req.body.observaciones;

    var exito=[];
    var errores=[];

    if(!boletos){
        errores.push({text:"Debe ingresar la cantidad de boletos"});
    }
    if(!maletas){
        errores.push({text:"Debe ingresar la cantidad de maletas"});
    }

    if(errores.length>0){
        res.render("./cliente/boletosSeleccionar",{
            errores,
            boletos,
            maletas
        });
    } else{
        exito.push({text:"Se insertaron los datos correctamente"});
        res.render("./cliente/boletosSeleccionar",{
            exito
        })
    }
})

router.get('/cliente/boletos', (req,res)=>{
    res.render("cliente/boletos");
})

router.get('/cliente/boletos/disponibles', (req,res)=>{
    res.render("cliente/boletosDisponibles");
})

router.get('/cliente/boletos/seleccionar', (req,res)=>{
    res.render("cliente/boletosSeleccionar");
})


module.exports = router;