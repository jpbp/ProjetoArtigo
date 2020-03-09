const express = require('express')
const app = express()
const consign= require('consign')
const db = require('./config/db')

app.db=db
consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/router.js')
    .into(app)

app.listen(5000,()=>{
    console.log('Backend executando...')
})