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
        res.render("administrador/reportesSeleccion",{errores});
    }
    else{ 
        //recorre aerolineas y agrega por nombre
        while(totalAerolineas.length>contadorAerolineas){
            
            var nombreEnAerolineas= totalAerolineas[contadorAerolineas].nombre;
            var contadorEnVuelos=0;

            var ArrayUnaAerolineaVuelos=[];
            ArrayUnaAerolineaVuelos.push({nombreEnAerolineas});

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
            TotalAerolineasConVuelosFiltrados[contadorVuelosFiltrador].push({MontototalPorAerolinea});

            contadorVuelosFiltrador+=1;

        }

        res.render("administrador/administradorMostrarReporteAerolineas",{TotalAerolineasConVuelosFiltrados});

    }

})

router.get('/administrador/reportesSolicitarCedula', (req,res)=>{
    res.render("administrador/reporteSeleccionarCedula");
})


router.post('/administrador/reporteRangoBoletos', async (req,res)=>{
   
    var ingresado=req.body.cedula;
    var errores=[];

    console.log(ingresado)

    if(!ingresado){
        errores.push({text:'Debe ingresar el número de cédula'});
    }

    if(errores.length>0){
        res.render("administrador/reporteSeleccionarCedula",{errores});
    }

    else{

        var boletosEnVuelosCliente=[];

        const totalVuelos = await vuelos.find();
        var editado=false;
        var contadorVuelos=0;

        while(totalVuelos.length>contadorVuelos){

            var contadorBoletos=1;
            var cantidadPorVuelo=0;

            while(totalVuelos[contadorVuelos].boletos.length>contadorBoletos){
                
                
                if(totalVuelos[contadorVuelos].boletos[contadorBoletos][2]==ingresado){
                    cantidadPorVuelo+=1;
                    editado=true;
                    
                }

                contadorBoletos+=1
            }

            boletosEnVuelosCliente.push(cantidadPorVuelo);
            

            contadorVuelos+=1;
        }


        if(editado==false){
            errores.push({text:"El cliente no tiene boletos comprados o no existe"})
            res.render("administrador/reporteSeleccionarCedula",{errores})
        }
        else{ 
            console.log(boletosEnVuelosCliente);
            var maximo=0;
            var minimo=1;
            var contadorFinal=0;

            maximo=boletosEnVuelosCliente[0];

            while(boletosEnVuelosCliente.length>contadorFinal){

                if(boletosEnVuelosCliente[contadorFinal]==0){

                }
                else if(boletosEnVuelosCliente[contadorFinal]<minimo){
                    minimo=boletosEnVuelosCliente[contadorFinal]
                }

                if(boletosEnVuelosCliente[contadorFinal]>maximo){
                    maximo=boletosEnVuelosCliente[contadorFinal]
                }

                contadorFinal+=1;

            }

            console.log(maximo)
            console.log(minimo)

            res.render("administrador/reporteMostrarRangoCliente",{maximo,minimo,ingresado});
        }

    }

})

router.get('/administrador/destinosMasVisitados', async (req,res)=>{
    await vuelos.aggregate([
        {
          $group: {
             _id: "$destino",
             count: { $sum: 1 }
          }
        }
     ],async (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            var resultado = [];

            var i = 0;
            while (i< result.length){
                var comprados = 0;

                const  vue = await vuelos.find({destino:result[i]._id});
                var y = 0;
                while(y<vue.length){

                    var x = 1;
                    while (x < vue[y].boletos.length){
                        if(vue[y].boletos[x][1] != "LIBRE"){
                            comprados+=1;
                        }
                    x+=1;
                    }
                y+=1;
                }
                resultado.push({destino:result[i]._id,count:result[i].count,boletosComprados:comprados});                
                i+=1;
            }
            res.render("./administrador/resultadoDestinosMasVisitados",{resultado});
        }else{
            var errors = [{text:"No existen vuelos registrados"}];
            res.render("./administrador/reportesSeleccion",{errors});
        }
        
     });
})


router.post('/administrador/reporteSolicitarFiltro',async(req,res)=>{
    var seleccion = req.body.filtro;
    if(seleccion == ""){
        var total = 0;
        var resultado = [];
        var vuelo = vuelos.find();
        
        var i = 0;
        while(i<vuelo.length){

            var y = 1;
            while(y<vuelo[i].boletos.length){
                if(vuelo[i].boletos[y][1] != "LIBRE"){
                    total+=1;
                }
                y+=1;
            }
            i+=1;
        }
        resultado.push({cantidad:total});
        res.render('administrador/resultadoReporteCantidad',{resultado});
    }else if(seleccion == "Rango de fechas"){
        res.render('administrador/reporteSeleccionarFechas');
    }else if(seleccion == "Estado del vuelo"){
        res.render('administrador/reporteSeleccionarEstado');
    }else if(seleccion == "Cédula del pasajero"){
        res.render('administrador/reporteSeleccionarCedula');
    }

})
    
router.post('/administrador/reporteSeleccionarCedula',async(req,res)=>{
})

router.post('/administrador/reporteSeleccionarEstado',async(req,res)=>{
    
})

router.post('/administrador/reporteSeleccionarFechas',async(req,res)=>{
    
})

router.get('/administrador/OperacionesRegistradas', (req,res)=>{
    res.render('administrador/reporteSolicitarFiltro');
})

module.exports = router;