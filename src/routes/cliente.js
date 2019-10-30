const express= require('express');
const router = express.Router();
const cliente = require("../models/pasajero");
const correoPrueba=require("../config/props");
const vuelo = require("../models/vuelo");
const aerolinea = require("../models/aerolinea");
const pasajeros = require("../models/pasajero");

router.post('/cliente/checkin',async(req,res)=>{
    var identificacion= req.body.identificacion;
    var codigo= req.body.codigo;
    var contadorBoletos=1;
  
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
        await vuelo.findOne({idVuelo:codigo},async(err,vueloChekear)=>{
            if(err){
                console.log(err);
            }else{
                if(!vueloChekear){
                    errores.push({text:"El identificador del vuelo no corresponde a los existentes"})
                    res.render("./cliente/checkin",{errores});
                }else{
                    console.log(contadorBoletos);
                    vueloChekear.boletos[contadorBoletos][1]="Checked";
                    vueloChekear.boletos[contadorBoletos][2]=identificacion;
                    //contadorBoletos= vueloChekear.boletos[contadorBoletos];
                    console.log(vueloChekear);
                    vueloChekear.save();
                    exito.push({text: "Se realizó con éxito, su número de asiento es:"+contadorBoletos});
                        res.render("./cliente/usuarios",{
                            exito});   
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
router.post('/cliente/fechas',async (req,res)=>{

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
        res.render("./cliente/reporteVueloFechas",{
            errores
        });
    }
    else{

        var dateFin = new Date(fechaFin);
        var dateInit = new Date(fechaInicio);

        const vuelosFinales = await vuelo.find(
            {fechaIda:{$gte:dateInit}, fechaVuelta:{$lte:dateFin}})
        
        
        contadorVuelos=0;
        var vuelosPorCliente=[]

        const UsuarioActual = await pasajeros.findOne({correo:correoPrueba.correo})
        var correoUsuarioActual = UsuarioActual.idPasajero;
        console.log(correoUsuarioActual)
        console.log(vuelosFinales)

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
            res.render("./cliente/reporteVueloFechas",{
                errores
            });
        }
        else{

            res.render("./cliente/mostrarVuelosFiltrados",{
                vuelosPorCliente
            });
        }

    }

})
router.post('/cliente/estados', (req,res)=>{
    
    var estadoIngresado= req.body.estado;

    var errores=[];

    vuelo.find({estado:estadoIngresado}, async (err,vuelosFinales)=>{
        
        if(vuelosFinales.length==0){
            var noEncontrado=[];
            noEncontrado.push({text:"Usted no tiene vuelos con el estado "+estadoIngresado});
            res.render("./cliente/reporteVueloEstado",{
                noEncontrado
            });
        }
        else{

            contadorVuelos=0;
            var vuelosPorCliente=[]

            const UsuarioActual = await pasajeros.findOne({correo:correoPrueba.correo})
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
                res.render("./cliente/reporteVueloFechas",{
                    errores
                });
            }
            else{ 
                res.render("./cliente/mostrarVuelosFiltrados",{
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