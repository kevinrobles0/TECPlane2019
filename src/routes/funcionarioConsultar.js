const express= require('express');
const router = express.Router();
const pasajeros = require("../models/pasajero");

router.get('/funcionario/funcionarioConsultarPasajeros', async (req,res)=>{
    
    await pasajeros.find(async (err,pasajerosEncontrados)=>{
        if(err){
            res.send("error");
        }

        else{
            res.render("funcionario/funcionarioConsultarPasajeros",{pasajerosEncontrados});
        }
    });
    
    
});


module.exports = router;