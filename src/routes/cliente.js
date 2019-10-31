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
        await vuelo.findOne({idVuelo:codigo},async(err,vueloChekear)=>{
            if(err){
                console.log(err);
            }else{
                if(!vueloChekear){
                    errores.push({text:"El identificador del vuelo no corresponde a los existentes"})
                    res.render("./cliente/checkin",{errores});
                }else{
                    console.log(contadorBoletos);
                    while(vueloChekear.boletos.length>=contadorBoletos){
                        console.log(contadorBoletos);

                        if(vueloChekear.boletos[contadorBoletos][2]==identificacion){
                            encontro=true;

                            if(!vueloChekear.boletos[contadorBoletos][1]){
                                break;
                            }
                            else if(vueloChekear.boletos[contadorBoletos][1]=="COMPRADO"){
                                console.log("Entro");
                                vueloChekear.boletos[contadorBoletos][1]="Checked";
                                console.log(vueloChekear.boletos[contadorBoletos][1]);
                                vueloChekear.save();
                                break;
                            }
                        }
                        contadorBoletos+=1;

                    }
                    if(encontro==false){
                        errores.push({text:"No se encontró ningún boleto registrado a su cédula"});
                        res.render("./cliente/checkin",{errores});                
                    }
                    else{
                        exito.push({text:"Se chekearon correctamente los boletos"});
                        res.render("./cliente/checkin",{exito}); 
                    
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