const express = require('express')
const app = express()
const consign= require('consign')

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/router.js')
    .into(app)

app.listen(5000,()=>{
    console.log('Backend executando...')
})