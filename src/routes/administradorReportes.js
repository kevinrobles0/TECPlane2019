const express= require('express');
const router = express.Router();

router.get('/administrador/reportes', (req,res)=>{
    res.render("administrador/reportesSeleccion");
})

router.get('/administrador/volver', (req,res)=>{
    res.render("indexAdministrador");
})

router.get('/administrador/reporteAerolinea', (req,res)=>{
    //mostrar vuelos,boletos,monto total de boletos
})

router.post('/administrador/reporteRangoBoletos', (req,res)=>{
   
    var ingresado=req.body.ingresado;
    var errores=[];

    if(!ingresado){
        errores.push({text:'Debe ingresar el número de cédula'});
    }

    if(errores.length>0){
        res.render("administrador/reportesSolicitarCedula",{errores});
    }

    else{
        //codigo de rango por cliente
    }

})

router.get('/administrador/destinosMasVisitados', (req,res)=>{
    //mostrar destinos mas visitados
})

router.get('/administrador/OperacionesRegistradas', (req,res)=>{
    
    var eleccion=String(req.body.filtro);


    if(eleccion=="Rango de fechas"){
        
    }

    if(eleccion=="Estado"){
        
    }

    if(eleccion=="Nombre de pasajero"){
        
    }
})

module.exports = router;