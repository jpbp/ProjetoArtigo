module.exports = app =>{
    const { existOrError,notExistOrError} = app.api.validator
}
const save = (req,res)=>{
    const article = {... req.body}

    // verificando se existe id 
    if(req.params.id) article.id=req.params.id
    try{
        existOrError(article.name,'Nome não informado')
        existOrError(article.description,'descrição não informado')
        existOrError(article.categoryId,'categoria não informado')
        existOrError(article.userId,'autor não informado')
        existOrError(article.content,'autor não informado')
    }catch(msg){
        res.status(400).send(msg)
    }
    
    if(article.id){
        app.db('articles')
            .update(article)
            .where({id:article.id})
            .then(_=> res.status(204).send())
            .cha
    }

}