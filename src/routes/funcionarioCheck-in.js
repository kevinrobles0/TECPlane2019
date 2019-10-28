const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");
const vuelos = require("../models/vuelo");


router.get('/funcionario/funcionarioCheck-in', (req,res)=>{
    res.render("funcionario/funcionarioCheck-in");
})

router.post('/funcionario/Check-in', (req,res)=>{
    
    var cedulaIngresada = req.body.ingresado;
    var noIngresado=[];
    var noEncontrado=[];
    var pasajeroSinVuelos=[];
    var exito=[];

    if(!cedulaIngresada){
        noIngresado.push({text: "Debe ingresar la cédula del pasajero"});
        res.render("funcionario/funcionarioCheck-in",{noIngresado});
    }
    else{
        vuelos.find(async (err,vuelosEncontrados)=>{

            var vueloConCedulaIngresada=0;
            var checkedIn=false;
            var sincheckIn=[];
            var exito=[];
            
            var contador=0;
            while(vuelosEncontrados.length>contador){
                var cedulaVuelo = vuelosEncontrados[contador].boletos[2];
                
                if(cedulaVuelo==cedulaIngresada){
                    vueloConCedulaIngresada+=1;

                    var estadoPasajero=vuelosEncontrados[contador].boletos[1];

                    if(estadoPasajero=="Checked"){
                        checkedIn=true;
                    }

                }
                contador+=1;

            }

            if(vueloConCedulaIngresada==0){
                pasajeroSinVuelos.push({text:"El pasajero ingreasado no se encuentra en los vuelos"});
                res.render("funcionario/funcionarioCheck-in",{pasajeroSinVuelos});
            }
            else{
                if(checkedIn==false){
                    sincheckIn.push({text:"El pasajero no ha realizado Check-In"});
                    res.render("funcionario/funcionarioCheck-in",{sincheckIn});  
                }
                if(checkedIn==true){
                    exito.push({text:"El pasajero ya realizó Check-In"});
                    res.render("funcionario/funcionarioCheck-in",{exito});  
                }
            }

        });
    }

})


module.exports = router;