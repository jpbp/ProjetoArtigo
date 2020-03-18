const express = require('express')
const app = express()
const consign= require('consign')
const db = require('./config/db')
const moongose= require('mongoose')

require('./config/mongodb.js')

app.get('/test',(req,res)=>{
    res.send("foi")
})

app.db=db
app.moongose=moongose
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./schedule')
    .then('./config/router.js')
    .into(app)

app.listen(5000,()=>{
    console.log('Backend executando...')
})