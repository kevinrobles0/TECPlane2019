const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");

router.get('/funcionario/funcionarioConsultarPasajeros', async (req,res)=>{
    
    const pasajerosTotales = pasajeros.find(async (err,nombreEncontrado)=>{
        if(err){
            res.send("error");
        }

        else{
            res.render("funcionario/funcionarioConsultarPasajeros",{pasajerosTotales});
        }
    });
    
    
});


module.exports = router;