const express= require('express');
const router = express.Router();


router.get('/administrador/aeropuerto', (req,res)=>{
    res.render("administrador/aeropuerto");
})

router.get('/administrador/funcionario', (req,res)=>{
    res.render("administrador/funcionario");
})

router.get('/administrador/aerolinea', (req,res)=>{
    res.render("administrador/aerolinea");
})

router.get('/administrador/vuelo', (req,res)=>{
    res.render("administrador/vuelo");
})


module.exports = router;