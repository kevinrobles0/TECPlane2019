const express= require('express');
const router = express.Router();
const cliente = require("../models/pasajero");
const correoPrueba=require("../config/props");

router.post('/cliente/usuarioCrear',async(req,res)=>{
    var idPasajero= req.body.cedula;
    var nombre= req.body.nombre;
    var FechaNacimiento=req.body.nacimiento;
    var nacionalidad=req.body.nacionalidad;
    var residencia= req.body.residencia;
    var telefonos= req.body.telefono;
    var correo= req.body.correo;
    var contraseña= req.body.contraseña;

    var exito=[];
    var errores=[];

    if(!idPasajero){
        errores.push({text:"Debe ingresar la cédula"});
    }
    if(!nombre){
        errores.push({text:"Debe ingresar el nombre"});
    }
    if(!FechaNacimiento){
        errores.push({text:"Debe ingresar la fecha de nacimiento"});
    }
    if(!residencia){
        errores.push({text:"Debe ingresar la residencia"});
    }
    if(!telefonos){
        errores.push({text:"Debe ingresar el teléfono"});
    }
    if(!correo){
        errores.push({text:"Debe ingresar el correo electrónico"});
    }
    if(!contraseña){
        errores.push({text:"Debe ingresar la contraseña"});
    }
    if(errores.length>0){
        res.render("./cliente/usuarioCrear",{
            errores,
            idPasajero,
            nombre,
            FechaNacimiento,
            residencia,
            telefonos,
            correo,
            contraseña
        });
    } else{
        const noUsuario= new cliente ({idPasajero,nombre,FechaNacimiento,nacionalidad,residencia,telefonos,correo,contraseña});
        noUsuario.save();
        exito.push({text:"Se creo el usuario de manera exitosa"});
        res.render("./indexapp",{
            exito
        });
    }
})
router.get('/cliente/usuarioConsultar', async (req,res)=>{
    console.log(correoPrueba.correo);
    console.log("hhh");
    const client = await cliente.findOne({correo:correoPrueba.correo});
    console.log(client);
    if(!err){
        res.send("error");
        console.log("Entro en el error");
        }
    else{
        console.log("Entro al else");
        console.log(client);            
        res.render("cliente/usuarioConsultar",{client});
        }
    });
    
    

router.post('/cliente/usuarioEliminar', async (req,res) =>{
    var exito=[];
    var errores =[];
   // var ingresado = 222;
    //Se hace con un id especifico
    console.log("probando");

    await cliente.deleteOne({correo:correoPrueba.correo}, (err)=>{
        if(err){
            console.log(err);
        }else{
            exito.push({text:"Se ha eliminado el cliente con éxito"});
            res.render("./cliente/usuarios",{
            exito
            });            
        }
    })
    
})


router.post('/cliente/usuarioActualizar', async (req,res)=>{
    
    var idPasajero= req.body.cedula;
    var nombre = req.body.nombre;
    var FechaNacimiento=req.body.nacimiento;
    var nacionalidad = req.body.nacionalidad;
    var residencia = req.body.residencia;
    var telefonos= req.body.telefono;
    var correo= req.body.correo;

    var errores=[];
    var exito = [];

        await cliente.findOne({correo : correoPrueba.correo}, async (err, datosCliente)=>{
            console.log("Hola");
                if(!datosCliente){
                    errores.push({text:"No se encontró el usuario"})
                    res.render("./cliente/usuarioActualizar",{
                        errores
                    });
                }
                else{
                    console.log(datosCliente);
                    var contador=0;
                    if(idPasajero){
                        datosCliente.idPasajero=idPasajero;
                        contador+=1;
                    }

                    if(nombre){
                        datosCliente.nombre=nombre;
                        contador+=1;
                    }
                    if(FechaNacimiento){
                        datosCliente.FechaNacimiento=FechaNacimiento;
                        contador+=1;
                    }
                    if(residencia){
                        datosCliente.residencia=residencia;
                        contador+=1;
                    }
                    if(telefonos){
                        datosCliente.telefonos=telefonos;
                        contador+=1;
                    }
                    if(correo){
                        datosCliente.correo=correo;
                        contador+=1;
                    }             

                    if(contador==0){
                        errores.push({text:"Debe editar al menos un dato"});
                        res.render("./cliente/usuarioActualizar",{
                            errores
                        });
                    }
                    else{
                        console.log("paso")
                        console.log(datosCliente)
                        datosCliente.save();
                        console.log("exito");
                        exito.push({text: "Se actualizó con éxito"});
                        res.render("./cliente/usuarios",{
                            exito
                        });
                        
                    }
                }
            
        });
    
});
router.get('/cliente/usuarios/crear', (req,res)=>{
    res.render("cliente/usuarioCrear");
})
router.get('/cliente/usuarios/consultar', (req,res)=>{
    console.log(correoPrueba.correo);
    res.render("cliente/usuarioConsultar");
})

router.get('/cliente/usuarios/eliminar', (req,res)=>{
    res.render("cliente/usuarioEliminar");
})

router.get('/cliente/usuarios/actualizar', (req,res)=>{
    res.render("cliente/usuarioActualizar");
})

module.exports = router;