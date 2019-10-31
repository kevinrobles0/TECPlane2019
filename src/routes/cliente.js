const express= require('express');
const router = express.Router();
const cliente = require("../models/pasajero");
const correoPrueba=require("../config/props");
const vuelo = require("../models/vuelo");
const aerolinea = require("../models/aerolinea");


router.post('/cliente/checkin',async(req,res)=>{
    var identificacion= req.body.identificacion;
    var codigo= req.body.codigo;
    var contadorBoletos=1;
    var idCliente=0;
    var numeroAsientos=[];
  
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
    }else{
        var encontro=false;
        var checkedIn=false;
        

        await vuelo.findOne({idVuelo:codigo},async(err,vueloChekear)=>{
            if(err){
                console.log(err);
            }else{

                var boletosEncontrados=vueloChekear.boletos;

                if(!vueloChekear){
                    errores.push({text:"El identificador del vuelo no corresponde a los existentes"})
                    res.render("./cliente/checkin",{errores});
                }else{
                    
                    while(boletosEncontrados.length>contadorBoletos){
                        
                        if(boletosEncontrados[contadorBoletos][2]==identificacion){ 
                            
                            encontro=true;

                            if(boletosEncontrados[contadorBoletos][1]=='COMPRADO'){                            
                                boletosEncontrados[contadorBoletos][1]='CHECKED';
                                numeroAsientos.push(contadorBoletos);
                                checkedIn=true;
                            }
                        }
                        contadorBoletos+=1;
                    }

                    if(encontro==false){
                        errores.push({text:"No se encontró ningún boleto registrado a su cédula"});
                        res.render("./cliente/checkin",{errores});                
                    }
                    else if(checkedIn==false){
                        errores.push({text:"No se encontraron boletos a checkear"});
                        res.render("./cliente/checkin",{errores});  
                    }
                    else{
                        await vuelo.updateOne({idVuelo:codigo},{$set:{boletos:boletosEncontrados}},function(err,resp){
                            if(err){
                                console.log(err);
                            }else{
                                exito.push({text:"Se ha realizado el check-in manera correcta,sus asientos son:  "+numeroAsientos});
                                res.render("indexCliente",{exito});
                            }
                        }) 
                    
                    }

                }
  
            }

        });

    
    }
});
   

     

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


router.get('/cliente/reportes', (req,res)=>{
    res.render("cliente/reporteEscogerFiltro");
})

router.post('/cliente/elegirfiltro' ,async(req,res)=>{

    var eleccion=String(req.body.filtro);

    console.log(eleccion)

    if(eleccion=="Rango de fechas"){
        res.render("cliente/reporteVueloFechas");
    }

    if(eleccion=="Estado"){
        res.render("cliente/reporteVueloEstado");
    }

})

//incicio filtros
router.post('/cliente/fechas', (req,res)=>{

    //listo
    console.log("1")

})
router.post('/cliente/estados', (req,res)=>{
    

    //listo
    console.log("2")

    var estadoIngresado= req.body.estado;

    var errores=[];

    vuelo.find({estado:estadoIngresado}, async (err,vuelosFinales)=>{
        
        if(vuelosFinales.length==0){
            var noEncontrado=[];
            noEncontrado.push({text:"Usted no tiene vuelos con el estado "+estadoIngresado});
            res.render("cliente/reporteVueloEstado",{
                noEncontrado
            });
        }
        else{
            
                contadorVuelos=0;
                var vuelosPorCliente=[]

                const UsuarioActual = await cliente.findOne({correo:correoPrueba.correo})
                var correoUsuarioActual = UsuarioActual.idPasajero;

                while(vuelosFinales.length >contadorVuelos){
                    contadorBoletos=1;
        
                    while(vuelosFinales[contadorVuelos].boletos.length>contadorBoletos){
                        if(vuelosFinales[contadorVuelos].boletos[contadorBoletos][2]==correoUsuarioActual){
                            vuelosPorCliente.push(vuelosFinales[contadorVuelos]);
                            break;
                        }
                        contadorBoletos+=1;
                    }
        
                    contadorVuelos+=1;
                }

                if(vuelosPorCliente.length==0){
                    errores.push({text:"No existen vuelos para usted en este rango de fechas"})
                    res.render("cliente/reporteVueloEstado",{
                        errores
                    });
                }
                else{ 
                    console.log(vuelosPorCliente)
                    res.render("cliente/mostrarVuelosFiltrados",{
                        vuelosPorCliente
                    });
                }
            }
        

    });


})

//fin filtros



router.post('./indexCliente' ,async(req,res)=>{
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

router.get('./indexCliente',(req,res)=>{
    res.render('./indexCliente');
})


module.exports = router;