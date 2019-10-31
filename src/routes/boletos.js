const express= require('express');
const router = express.Router();
const vuelos = require("../models/vuelo");
const fechas = require("../models/comparacionfechas");
const cliente = require("../models/pasajero");
const correoPrueba=require("../config/props");
//Filtros
router.post('/cliente/boleto/filtro', (req,res)=>{
    var eleccion=String(req.body.filtro);
    console.log(eleccion)

    if(eleccion=="Rango de fechas"){
        res.render("cliente/boletosFechas");
    }
    if(eleccion=="Lugares de destino"){
        res.render("cliente/boletosLugares");
    }
});

router.post('/cliente/boleto/lugares',async(req,res)=>{
    var lugarSalida=req.body.origen;
    var lugarEntrada= req.body.destino;
    var errores=[];
    var noEncontrado=[];

    if(!lugarSalida){
        errores.push({text:"Debe ingresar la fecha inicial "});
    }
    if(!lugarEntrada){
        errores.push({text:"Debe ingresar la fecha final"});
    }
    if(errores.length>0){
        res.render("./cliente/boletosLugares",{
            errores
        });
    }else{

        const vuelosFinales = await vuelos.find({origen:lugarSalida, destino:lugarEntrada});

        console.log(vuelosFinales.length)
        console.log(vuelosFinales)
        if(vuelosFinales.length==0){
            errores.push({text:"No hay vuelos en los lugares indicados"});
            res.render("cliente/boletosLugares",{errores});
        }
        else{
            res.render("cliente/boletosEncontrados",{vuelosFinales});
        }

    }

})

router.post('/cliente/boleto/fechas',async(req,res)=>{
    var fechaInicio=req.body.fechasalida;
    var fechaFin=req.body.fechaentrada;
    var errores=[];
    var noEncontrado=[];

    if(!fechaInicio){
        errores.push({text:"Debe ingresar la fecha inicial "});
    }
    if(!fechaFin){
        errores.push({text:"Debe ingresar la fecha final"});
    }

    if(errores.length>0){
        res.render("./funcionario/reporteVuelosFechas",{
            errores
        });
    }else{

        const fechasComparar = new fechas({fechaInicio,fechaFin});

        var dateInit = new Date(fechaInicio);
        var dateFin = new Date(fechaFin);

        const vuelosFinales = await vuelos.find(
            {fechaIda:{$gte:dateInit}, fechaVuelta:{$lte:dateFin}});
        
        console.log(vuelosFinales.length)
        console.log(vuelosFinales)

        if(vuelosFinales.length==0){
            errores.push({text:"No hay vuelos en el rango de fechas indicado"});
            res.render("cliente/boletosFechas",{errores});
        }
        else{
            res.render("cliente/boletosEncontrados",{vuelosFinales});
        }
        
    }
})


router.post('/cliente/boletos/seleccionar',async(req,res)=>{
    var boletos= req.body.boletos;
    var maletas= req.body.maletas;
    var observaciones= req.body.observaciones;
    var vuelo=req.body.idVuelo;
    var idCliente=0;
  
    var exito=[];
    var errores=[];

    if(!vuelo){
        errores.push({text:"Debe ingresar el id del vuelo"});
    }
    if(!boletos){
        errores.push({text:"Debe ingresar la cantidad de boletos"});
    }
    if(!maletas){
        errores.push({text:"Debe ingresar la cantidad de maletas"});
    }
    if(errores.length>0){
        res.render("./cliente/boletosSeleccionar",{
            errores,
            vuelo,
            boletos,
            maletas
        });
    } else{
        
        var encontro=false;
        await cliente.findOne({correo:correoPrueba.correo},async(err,client)=>{
            if(err){
                res.send("error");
                }
                else{
                    idCliente=client.idPasajero;
                    /*console.log(idCliente);
                console.log(client);*/}
        });

        var boletosActualesComprado=0;

        await vuelos.findOne({idVuelo:vuelo},async(err,vueloComprar)=>{

            console.log(vueloComprar);  

            if(!vueloComprar){
                errores.push({text:"No se encontro el vuelo ingresado"});
                res.render("cliente/boletosSeleccionar",{errores});
            }else{
                var contadorBoletos=1;
                var boletosEncontrados=vueloComprar.boletos;
                console.log(boletosEncontrados);
                console.log(boletosEncontrados.length);
                while(boletosEncontrados.length>contadorBoletos){

                        if(boletosEncontrados[contadorBoletos][1]=='LIBRE'){                            
                            boletosEncontrados[contadorBoletos][1]='COMPRADO';
                            boletosEncontrados[contadorBoletos][2]=idCliente;
                            encontro=true;
                            boletosActualesComprado+=1
                        }
                        contadorBoletos+=1;
                        
                        if(boletos==boletosActualesComprado){
                            break;
                        }
                }
                console.log(encontro)
                if(encontro==false){
                    errores.push({text:"No se encontro el vuelo ingresado"});
                    res.render("cliente/boletosSeleccionar",{errores});
                }else{
                    await vuelos.updateOne({idVuelo:vuelo},{$set:{boletos:boletosEncontrados}},function(err,resp){
                        if(err){
                            console.log(err);
                        }else{
                            exito.push({text:"Se han comprado los boletos de manera correcta"});
                            res.render("indexCliente",{exito});
                        }
                    })    
                    
                }
                
            }
        })

    }
})

router.get('/cliente/boletos', (req,res)=>{
    res.render("cliente/boletos");
})

router.get('/cliente/boleto/filtro', (req,res)=>{
    res.render("cliente/filtroBoleto");
})

router.get('/cliente/boleto/fechas', (req,res)=>{
    res.render("cliente/boletosFechas");
})
router.get('/cliente/boleto/lugares', (req,res)=>{
    res.render("cliente/boletosLugares");
})

/*router.get('/cliente/boleto/encontrado', (req,res)=>{
    res.render("cliente/boletosEncontrados");
})
router.get('/cliente/boletos/disponibles', (req,res)=>{
    res.render("cliente/boletosDisponibles");
})*/

router.get('/cliente/boletos/seleccionar', (req,res)=>{
    res.render("cliente/boletosSeleccionar");
})


module.exports = router;
/*router.post('/cliente/boletos',async(req,res)=>{
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
        await vuelos.find(async (err, vuelosEncontrados)=>{
            console.log(vuelosEncontrados);
            if(!vuelosEncontrados){
                errores.push({text:"No hay vuelos en las fechas indicadas"});
                res.render("./cliente/boletos",{
                    errores
                });
            }else{
                res.render("./cliente/boletosDisponibles",{
                    vuelosEncontrados
                });
            }
        });

        
       
    }
})*/