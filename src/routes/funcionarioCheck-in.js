const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");
const vuelos = require("../models/vuelo");


router.get('/funcionario/funcionarioCheck-in', (req,res)=>{
    res.render("funcionario/funcionarioCheck-in");
})

router.post('/funcionario/Check-in', (req,res)=>{
    
    var cedulaIngresada = req.body.ingresado;
    var vueloIngresado = req.body.vuelo;

    var noIngresado=[];
    var noEncontrado=[];
    var pasajeroSinVuelos=[];
    var exito=[];

    if(!cedulaIngresada){
        noIngresado.push({text: "Debe ingresar la cédula del pasajero"});
        res.render("funcionario/funcionarioCheck-in",{noIngresado});
    }
    if(!vueloIngresado){
        noIngresado.push({text: "Debe ingresar el id vuelo"});
        res.render("funcionario/funcionarioCheck-in",{noIngresado});
    }
    else{
        vuelos.find(async (err,vuelosEncontrados)=>{

            var checkedIn=false;
            var sincheckIn=[];
            var encontrado=false;
            var exito=[];
            
            var contadorVuelos=0;
            while(vuelosEncontrados.length>contadorVuelos){
                
                if(vuelosEncontrados[contadorVuelos].idVuelo==vueloIngresado){
                    
                    var contadorBoletos=1;

                    while(vuelosEncontrados[contadorVuelos].boletos.length>contadorBoletos){

                        if(vuelosEncontrados[contadorVuelos].boletos[contadorBoletos][2]==cedulaIngresada){

                            encontrado=true;
                            
                            if(vuelosEncontrados[contadorVuelos].boletos[contadorBoletos][1]=="Checked"){
                                checkedIn=true;
                                break;
                            }

                        }

                        contadorBoletos+=1;
                    }

                }

                if(encontrado==true){
                    break;
                }

                contadorVuelos+=1;

            }

            if(encontrado==false){
                pasajeroSinVuelos.push({text:"El pasajero ingreasado no se encuentra en los vuelos"});
                res.render("funcionario/funcionarioCheck-in",{pasajeroSinVuelos});
            }
            else{
                if(checkedIn==false){
                    sincheckIn.push({text:"El pasajero aún no ha realizado Check-In"});
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