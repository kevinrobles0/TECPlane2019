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

    var fechasalida=req.body.fechasalida;
    var fechaentrada=req.body.fechaentrada;
    var errores=[];
    var noEncontrado=[];

    if(!fechasalida){
        errores.push({text:"Debe ingresar la fecha de salida "});
    }
    if(!fechaentrada){
        errores.push({text:"Debe ingresar la fecha de entrada"});
    }

    if(errores.length>0){
        res.render("./funcionario/reporteVuelosFechas",{
            errores
        });
    }
    else{
        await vuelos.find({fechaentrada:{$lt:fechaentrada}, fechasalida:{$gt:fechasalida}},async (err, vuelosEncontrados)=>{
            console.log(vuelosEncontrados);

            if(vuelosEncontrados.length==0){
                noEncontrado.push({text:"No hay vuelos en las fechas indicadas"});
                res.render("./funcionario/reporteVuelosFechas",{
                    noEncontrado
                });
            }

            else{
                res.render("./funcionario/reporteVuelosFiltrado",{
                    vuelosEncontrados
                });
            }

        });
    }
    
});


//filtro estado
router.post('/vuelos/estados', (req,res)=>{

    var estadoIngresado= req.body.estado;

    vuelos.find({estado:estadoIngresado}, async (err,vuelosEncontrados)=>{
        
        if(vuelosEncontrados.length==0){
            var noEncontrado=[];
            noEncontrado.push({text:"No existen vuelos con el estado "+estadoIngresado});
            res.render("./funcionario/reporteVuelosEstado",{
                noEncontrado
            });
        }
        else{
            res.render("./funcionario/reporteVuelosFiltrado",{
                vuelosEncontrados
            });
        }

    });
});

//Nombre de pasajero
router.post('/vuelos/reporteVuelosNombre', (req,res)=>{

    var cedulaIngresada= req.body.cedula;
    var vuelosTotalesPorCedula=[];
    var noEncontrado=[];
    var errores=[];

    if(!cedulaIngresada){
        errores.push({text:"Debe ingresar el número de cédula"})
        res.render("./funcionario/reporteVuelos",{
            errors
        });
    }

    else{
        vuelos.find( async (err,vuelosEncontrados)=>{
            
            var contador=0;
            while(vuelosEncontrados.length>contador){
                var cedulaVuelo = vuelosEncontrados[contador].boletos[0];
                
                if(cedulaVuelo==cedulaIngresada){
                    vuelosTotalesPorCedula.push(vuelosEncontrados[contador]);
                }
                contador+=1;

            }

            if(vuelosTotalesPorCedula.length==0){
                noEncontrado.push({text:"No existen pasajeros con ese número de cédula"});
                res.render("./funcionario/reporteVuelos",{
                    noEncontrado
                });
            }

            else{
                res.render("./funcionario/reporteVuelosFiltrado",{
                    vuelosEncontrados
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