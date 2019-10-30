const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");
const vuelos = require("../models/vuelo");


router.get('/funcionario/funcionarioReportes', (req,res)=>{
    res.render("funcionario/funcionarioReportes");
});

router.get('/funcionario/reporte/pasajero', (req,res)=>{
    res.render("funcionario/reportePasajero");
});

router.get('/funcionario/reporte/vuelos', (req,res)=>{
    res.render("funcionario/reporteVuelos");
});



//filtros
router.post('/funcionario/elegirfiltro', (req,res)=>{
   
    var eleccion=String(req.body.filtro);

    console.log(eleccion)

    if(eleccion=="Rango de fechas"){
        res.render("funcionario/reporteVuelosFechas");
    }

    if(eleccion=="Estado"){
        res.render("funcionario/reporteVuelosEstado");
    }

    if(eleccion=="Nombre de pasajero"){
        res.render("funcionario/reporteVuelosNombre");
    }

});

//filtro fechas
router.post('/vuelos/fechas', async (req,res)=>{

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
    }
    else{ 

        const fechasComparar = new fechas({fechaInicio,fechaFin});


        


        var dateFin = new Date(fechaFin);
        var dateInit = new Date(fechaInicio);

        const vuelosFinales = await vuelos.find(
            {fechaIda:{$gte:dateInit}, fechaVuelta:{$lte:dateFin}})
        
        console.log(vuelosFinales.length)
        console.log(vuelosFinales)

        if(vuelosFinales.length==0){
            errores.push({text:"No hay vuelos en el rango de fechas indicado"});
            res.render("funcionario/reporteVuelosFechas",{errores});
        }
        else{
            res.render("funcionario/reporteVuelosFiltrado",{vuelosFinales});
        }

    }
    
});


//filtro estado
router.post('/vuelos/estados', (req,res)=>{

    var estadoIngresado= req.body.estado;

    vuelos.find({estado:estadoIngresado}, async (err,vuelosFinales)=>{
        
        if(vuelosFinales.length==0){
            var noEncontrado=[];
            noEncontrado.push({text:"No existen vuelos con el estado "+estadoIngresado});
            res.render("./funcionario/reporteVuelosEstado",{
                noEncontrado
            });
        }
        else{
            res.render("./funcionario/reporteVuelosFiltrado",{
                vuelosFinales
            });
        }

    });
});

//Nombre de pasajero
router.post('/vuelos/reporteVuelosNombre', (req,res)=>{

    var cedulaIngresada= req.body.cedula;
    var noEncontrado=[];
    var errores=[];

    console.log(cedulaIngresada)

    if(!cedulaIngresada){

        errores.push({text:"Debe ingresar el número de cédula"})
        res.render("./funcionario/reporteVuelos",{
            errors
        });
    }

    else{

        vuelos.find( async (err,vuelosEncontrados)=>{
            
            var vuelosFinales=[];

            var contador=0;
            
            while(vuelosEncontrados.length>contador){

                var contadorBoletos=1;
                while(vuelosEncontrados[contador].boletos.length>contadorBoletos){

                    if(vuelosEncontrados[contador].boletos[contadorBoletos][2]==cedulaIngresada){
                        vuelosFinales.push(vuelosEncontrados[contador])
                        break;
                    }
                    contadorBoletos+=1;
                }

                contador+=1;

            }

            if(vuelosFinales.length==0){
                noEncontrado.push({text:"No existen pasajeros con ese número de cédula"});
                res.render("./funcionario/reporteVuelosNombre",{
                    noEncontrado
                });
            }

            else{
                res.render("./funcionario/reporteVuelosFiltrado",{
                    vuelosFinales
                });
            }

        });
    }
});

//fin reportes

router.post('/funcionario/consultarPasajero',async  (req,res)=>{
    
    var cedulaIngresada = req.body.ingresado;
    var noIngresado=[];
    var noEncontrado=[];

    if(!cedulaIngresada){
        noIngresado.push({text: "Debe ingresar la cédula del pasajero"});
        res.render("funcionario/reportePasajero",{noIngresado});
    }
    else{
        pasajeros.find({idPasajero:cedulaIngresada}, async (err,pasajeroEncontrado)=>{
            console.log(pasajeroEncontrado)
            if(pasajeroEncontrado.length==0){
                noEncontrado.push({text:"El pasajero no corresponde a los registrados"});
                res.render("funcionario/reportePasajero",{noEncontrado});
            }
            else{
                res.render("funcionario/mostrarPasajeroReportes",{pasajeroEncontrado});
            }
        });
    }

});

module.exports = router;