const bodyParser=require('body-parser')

//permitir de um a origem diferente acessar um api 
const cors = require('cors')

module.exports= app=>{
    app.use(bodyParser.json())
    app.use(cors())
}