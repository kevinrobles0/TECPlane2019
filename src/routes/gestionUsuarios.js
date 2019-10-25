const express= require('express');
const router = express.Router();


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