const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowedge_stast',{useNewUrlParser:true})
    .catch(e=>{
        const msg= "ERRO, Não foi possivel conectar com mongodb"
        console.log(msg+e)
    })