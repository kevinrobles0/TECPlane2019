const express= require('express');
const router = express.Router();
const vuelos=require("../models/vuelo");

router.get('/funcionario/funcionarioAbordaje', (req,res)=>{
    res.render("funcionario/funcionarioAbordaje");
})

router.post('/funcionario/abordar', (req,res)=>{
    
    var cedula = req.body.cedula;
    var numeroVuelo = req.body.vuelo;
    var exito=[];

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

        var errores=[];
        var checkedIn=false;
        var seEcontro=false;

        vuelos.find(async (err,vuelosEncontrados)=>{

            var contadorVuelos=0;
            while(vuelosEncontrados.length>contadorVuelos){

                var contadorBoletos=1;
                if(vuelosEncontrados[contadorVuelos].idVuelo==numeroVuelo){
                    while(vuelosEncontrados[contadorVuelos].boletos.length>contadorBoletos){

                        if(vuelosEncontrados[contadorVuelos].boletos[contadorBoletos][2]==cedula){
                            
                            seEcontro=true;

                            if(vuelosEncontrados[contadorVuelos].boletos[contadorBoletos][1]=="Checked"){ 
                                //esta manera no sirve fucking wierd
                                //vuelosEncontrados[contadorVuelos].boletos[contadorBoletos][1]="ABORDADO";
                                checkedIn=true;
                                const actualizar=await vuelos.findOne({idVuelo:numeroVuelo});
                                actualizar.boletos[contadorBoletos][1]="Abordado";
                                actualizar.save();
                                break;
                            }
                        }
                        contadorBoletos+=1

                    }
                }

                if(checkedIn==true){
                    break;
                }

                contadorVuelos+=1;
            }
            

            if(seEcontro==true && checkedIn==false){
                errores.push({text:"El pasajero no ha realizado Check In"});
                res.render("funcionario/funcionarioAbordaje",{errores});  
            }
            else if(seEcontro==false && checkedIn==false){
                errores.push({text:"El pasajero no se encuentra en ningun vuelo"});
                res.render("funcionario/funcionarioAbordaje",{errores});  
            }
            else{
                exito.push({text:"Se ha abordado al pasajero con cédula "+cedula+" en el vuelo "+numeroVuelo});
                res.render("funcionario/funcionarioAbordaje",{exito}); 
            }

        });

    }
})

module.exports = router;