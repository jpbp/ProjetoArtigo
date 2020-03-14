module.exports= app => {
    const Stat= app.moongose.model('Stat',{
        users:Number,
        categories:Number,
        articles:Number,
        createdAt:Date
    })

    const get =( req,res)=>{
        Stat.findOne({},{},{sort:{'createAt':-1}})
            .then(stat=> res.json(stat ||{users:0,
                categories:0,
                articles:0,
                createdAt:0}))
    }

    return{Stat,get}
}