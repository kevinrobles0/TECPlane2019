const express= require('express');
const router = express.Router();

router.get('/funcionario/funcionarioAbordaje', (req,res)=>{
    res.render("funcionario/funcionarioAbordaje");
})

router.post('/funcionario/abordar', (req,res)=>{
    
    var cedula = req.body.cedula;
    var numeroVuelo = req.body.numeroVuelo;

    var sinDatos=[];

    if(!cedula){
        sinDatos.push({text:"Debe ingresar el número de cédula"});
    }
    if(!numeroVuelo){
        sinDatos.push({text:"Debe ingresar el vuelo"});
    }

    if(sinDatos.length>0){
        res.render("funcionario/funcionarioAbordaje",{sinDatos});
    }
    else{

         var vueloConCedulaIDIngresada=0;

         var errores=[];

        vuelos.find(async (err,vuelosEncontrados)=>{
            
            var contador=0;
            while(vuelosEncontrados.length>contador){
                var cedulaVuelo = vuelosEncontrados[contador].boletos[2];
                var numeroVueloEncontrado = vuelosEncontrados[contador].idVuelo;

                if(cedulaVuelo==cedulaIngresada && numeroVuelo==numeroVueloEncontrado){
                    vueloConCedulaIDIngresada+=1;

                    vuelos[contador].boletos[2]="Abordado";
                }
                contador+=1;
            }

            if(vueloConCedulaIDIngresada==0){
                errores.push({text:"La información ingresada no corresponde a los vuelos"});
                res.render("funcionario/funcionarioAbordaje",{errores});  
            }
            else{
                exito.push({text:"Se ha abordado al pasajero con cédula "+cedulaIngresada+" en el vuelo "+numeroVuelo});
                res.render("funcionario/funcionarioAbordaje",{exitoS}); 
            }

        });

    }
})

module.exports = router;