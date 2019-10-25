const express= require('express');
const router = express.Router();



router.post('/cliente/checkin',async(req,res)=>{
    var identificacion= req.body.identificacion;
    var codigo= req.body.codigo;
  
    var exito=[];
    var errores=[];

    if(!identificacion){
        errores.push({text:"Debe ingresar la identificacion"});
    }
    if(!codigo){
        errores.push({text:"Debe ingresar el código"});
    }
  
    if(errores.length>0){
        res.render("./cliente/checkin",{
            errores,
            identificacion,
            codigo
        });
    } else{
        exito.push({text:"Se insertaron los datos correctamente"});
        res.render("./cliente/checkin",{
            exito
        })
    }
})

router.post('/cliente/abordaje',async(req,res)=>{
    var  vuelo= req.body.vuelo;
    var cedula= req.body.cedula;
  
    var exito=[];
    var errores=[];

    if(!vuelo){
        errores.push({text:"Debe ingresar el vuelo respectivo"});
    }
    if(!cedula){
        errores.push({text:"Debe ingresar la cédula"});
    }
  
    if(errores.length>0){
        res.render("./cliente/abordaje",{
            errores,
            vuelo,
            cedula
        });
    } else{
        exito.push({text:"Se insertaron los datos correctamente"});
        res.render("./cliente/abordaje",{
            exito
        })
    }
})

router.get('/cliente/usuarios', (req,res)=>{
    res.render("cliente/usuarios");
})

router.get('/cliente/checkin', (req,res)=>{
    res.render("cliente/checkin");
})

router.get('/cliente/abordaje', (req,res)=>{
    res.render("cliente/abordaje");
})


module.exports = router;