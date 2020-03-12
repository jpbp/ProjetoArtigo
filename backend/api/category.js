module.exports = app =>{
    const { existOrError,notExistOrError} = app.api.validator
    //metodo tanto para inserir quanto para remover
    const save = (req,res)=>{
        const category = {... req.body}
       
        //verificando se existe id
        if(req.params.id)category.id=req.params.id
        try{
            existOrError(category.name,'Nome não Informado')
        }catch(msg){
            return res.status(400).send(msg)
        }
        // se caso o id estiver presente, iremos fazer um update na categoria
        if(category.id){
            app.db('categories')
            .update(category)
            .where({id:category.id})
            .then(_=>res.status(204).send())
            .catch(err=>res.status(500).send(err))
        }else{ // se ele não tiver id, insere no banco
            app.db('categories')
            .insert(category)
            .then(_=>res.status(204).send())
            .catch(err=>res.status(500).send(err))
        }
    }
    //metodo para remover
    const remove = async(req,res)=>{
        try{ 
            existOrError(req.params.id,'Codigo da categoria não informado')
            //consulta ao bd para verificar a existencia de uma sub categoria 
            const subcategory= await app.db('categories')
                .where ({parentId:req.params.id})
            // se tiver alguma categoria com sub categoria eu não posso excluir
            notExistOrError(subcategory,'Categoria possui subCategoria')
            
            // verificação do db para verficar se existe algum artigo vinculado a categoria
            const articles= await app.db('articles')
                .where({categoriesId:req.params.id}) 
            notExistOrError(articles,"Categoria possui artigos") // se tiver a categoria estiver em algum artigo, eu tbm não posso excluir

            // caso não tiver vinculado a nenhum subcaterogia ou artigo, bora excluir
            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id}).del()
            existOrError(rowsDeleted,'categoria não foi encontrada')
            res.status(204).send()

        }catch(msg){
            res.status(400).send(msg)
        }

    }
    const withPath = categories =>{
        const getParent =(categories,parentId)=>{
            let parent = categories.filter(parent=>parent.id==parentId)
            return parent.length ? parent[0]: null
        }

        const categoriesWithPath= categories.map(category=>{
            let path = category.name
            let parent = getParent(categories,category.parentId)

            while(parent){
                path  = `${parent.name}> $ ${path}`
                parent = getParent(categories,parent.parentId)
            }
            return {... category,path}
        })
        categoriesWithPath.sort((a,b)=>{
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0

        })
        return categoriesWithPath
    }

    const get =(req,res)=>{
        app.db('categories')
        
            .then(categories=> res.json(withPath(categories)))
            .catch(err=> res.status(500).send(err))
    }

    const getById= (req,res)=>{
        app.db('categories')
        .where({id:req.params.id})
        .first()
        .then(category=>res.json(category))
        .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }
    return {save,getById,remove,get,getTree}
}