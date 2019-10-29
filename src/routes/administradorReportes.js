const express= require('express');
const router = express.Router();
const aerolineas = require("../models/aerolinea");
const vuelos = require("../models/vuelo");

router.get('/administrador/reportes', (req,res)=>{
    res.render("administrador/reportesSeleccion");
})

router.get('/administrador/volver', (req,res)=>{
    res.render("indexAdministrador");
})

//mostrar vuelos,boletos,monto total de boletos
router.get('/administrador/reporteAerolinea', async (req,res)=>{
    
    const totalAerolineas = await aerolineas.find();
    const totalVuelos = await vuelos.find();

    var contadorAerolineas=0;
    var errores=[];

    var TotalNombresAerolineasConVuelos=[];

    if(totalAerolineas.length==0){
        errores.push({text:"No existen aerolineas ingresadas"});
    }
    else{ 
        //recorre aerolineas y agrega por nombre
        while(totalAerolineas.length>contadorAerolineas){
            
            var nombreEnAerolineas= totalAerolineas[contadorAerolineas].nombre;
            var contadorEnVuelos=0;

            var ArrayUnaAerolineaVuelos=[];
            ArrayUnaAerolineaVuelos.push(nombreEnAerolineas);

            //agrega cada nombre de aerolinea en array y lo almacena en otro array
            TotalNombresAerolineasConVuelos.push(ArrayUnaAerolineaVuelos);

            console.log("here im dude")

            while(totalVuelos.length>contadorEnVuelos){


                var nombreEnVuelos= totalVuelos[contadorEnVuelos].nombreAerolinea;


                //compara cada nombre de vuelos con la aerolinea actual
                if(nombreEnAerolineas==nombreEnVuelos){

                    TotalNombresAerolineasConVuelos[contadorAerolineas].push(totalVuelos[contadorEnVuelos])

                }

                contadorEnVuelos+=1;
            }

            contadorAerolineas+=1;

        }

        var contadorEliminarSinVuelos=0;
        var TotalAerolineasConVuelosFiltrados=[];

        //elimina las aerolineas sin vuelos
        while(TotalNombresAerolineasConVuelos.length>contadorEliminarSinVuelos){

            if(TotalNombresAerolineasConVuelos[contadorEliminarSinVuelos].length>1){
                TotalAerolineasConVuelosFiltrados.push(TotalNombresAerolineasConVuelos[contadorEliminarSinVuelos]);
            }
            contadorEliminarSinVuelos+=1;

        }

        console.log(TotalAerolineasConVuelosFiltrados);


        //sacar monto por aerolinea
        var contadorVuelosFiltrador=0;
        var MontototalPorAerolinea=0;

        //recorre cada posicion que tiene nombre y vuelos
        while(TotalAerolineasConVuelosFiltrados.length>contadorVuelosFiltrador){

            var contadorPostNombre=1;
            var montoTotalAerolinea=0;

            //empieza en 1 para tomar solo los vuelos y no el nombre, recorre los boletos
            while(TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador].length>contadorPostNombre){

                var contadorBoletosPorVuelo=1;
                var boletosCompradosEnVuelo=0;
                
                //recorreo todos los boletos del vuelo actual
                while(TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador][contadorPostNombre].boletos.length-1>contadorBoletosPorVuelo){
                    
                    //si es diferente a libre suma a los boletos comprados
                    if(TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador][contadorPostNombre].boletos[contadorBoletosPorVuelo][1]!="LIBRE"){
                        boletosCompradosEnVuelo+=1
                    }

                    contadorBoletosPorVuelo+=1;
                }

                console.log(boletosCompradosEnVuelo)
                //suma al total el monto del vuelo actual
                montoTotalAerolinea=boletosCompradosEnVuelo*parseInt(TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador][contadorPostNombre].precio)
                MontototalPorAerolinea+=montoTotalAerolinea;
                contadorPostNombre+=1;

            }

            //agrega en la [lengh-1] del array el monto de la aerolinea con base en los vuelos
            TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador].push(MontototalPorAerolinea);
            contadorVuelosFiltrador+=1;

        }

        console.log(TotalAerolineasConVuelosFiltrados);

        //res.render("administradorMostrarReporteAerolinea",{TotalAerolineasConVuelosFiltrados});

    }

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