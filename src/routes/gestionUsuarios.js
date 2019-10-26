const express= require('express');
const router = express.Router();

router.post('/cliente/usuarios/crear',async(req,res)=>{
    var cedula= req.body.cedula;
    var nombre= req.body.nombre;
    var nacimiento=req.body.nacimiento;
    var nacionalidad=req.body.nacionalidad;
    var residencia= req.body.residencia;
    var telefono= req.body.telefono;
    var correo= req.body.correo;

    var exito=[];
    var errores=[];

    if(!cedula){
        errores.push({text:"Debe ingresar la cédula"});
    }
    if(!nombre){
        errores.push({text:"Debe ingresar el nombre"});
    }
    if(!nacimiento){
        errores.push({text:"Debe ingresar la fecha de nacimiento"});
    }
    if(!residencia){
        errores.push({text:"Debe ingresar la residencia"});
    }
    if(!telefono){
        errores.push({text:"Debe ingresar el teléfono"});
    }
    if(!correo){
        errores.push({text:"Debe ingresar el correo electrónico"});
    }
    if(errores.length>0){
        res.render("./cliente/usuariosCrear",{
            errores,
            cedula,
            nombre,
            nacimiento,
            residencia,
            telefono,
            correo
        });
    } else{
        exito.push({text:"Se creó el cliente correctamente"});
        res.render("./indexapp",{
            exito
        })
        
       
    }
})
router.get('/cliente/usuarios/crear', (req,res)=>{
    res.render("cliente/usuarioCrear");
})
router.get('/cliente/usuarios/consultar', (req,res)=>{
    res.render("cliente/usuarioConsultar");
})

router.get('/cliente/usuarios/eliminar', (req,res)=>{
    res.render("cliente/usuarioEliminar");
})

router.get('/cliente/usuarios/actualizar', (req,res)=>{
    res.render("cliente/usuarioActualizar");
})





module.exports = router;