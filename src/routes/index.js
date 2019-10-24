const express= require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.render('Indexapp');
})

router.get('/administrador', (req,res)=>{
    res.render('indexAdministrador');
})


module.exports = router;