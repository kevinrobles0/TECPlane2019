const express= require('express');
const router = express.Router();

router.get('/administrador/vuelo/crear', (req,res)=>{
    res.render("administrador/vueloCrear");
})
router.get('/administrador/vuelo/leer', (req,res)=>{
    res.render("administrador/vueloLeer");
})
router.get('/administrador/vuelo/eliminar', (req,res)=>{
    res.render("administrador/vueloEliminar");
})
router.get('/administrador/vuelo/actualizar', (req,res)=>{
    res.render("administrador/vueloActualizar");
})


module.exports = router;