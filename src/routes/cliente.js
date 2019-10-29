const express= require('express');
const router = express.Router();
const indexPrincipal = require('./index');



router.post('/cliente/checkin',async(req,res)=>{
    console.log(indexPrincipal.correoUsuario);
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

router.post('./indexCliente' ,async(req,res)=>{
    console.log('123456uiu543wertyhjhgfd');
    console.log(req.body.correo);
})

router.get('/cliente/usuarios', (req,res)=>{
    //console.log(req.body.correo);
    res.render("cliente/usuarios");

})

router.get('/cliente/checkin', (req,res)=>{
    res.render("cliente/checkin");
})

router.get('/cliente/abordaje', (req,res)=>{
    res.render("cliente/abordaje");
})

router.get('./indexCliente',(req,res)=>{
    res.render('./indexCliente');
})


module.exports = router;