//criptografar senha do usuer 
const bcrypt = require('bcrypt-nodejs')

module.exports= app =>{
    const { existOrError,notExistOrError,equalsOrError} = app.api.validator
    const encryptPassword = password=>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }
    const save = async(req,res)=>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        try{
            existOrError(user.name,'Nome não encontrado')
            existOrError(user.email,'email não encontrado')
            existOrError(user.password,'senha não encontrado')
            existOrError(user.confirmPassword,'senha invalada')
            existOrError(user.password,'senha não encontrado')
        }
    }
    return { save }
}