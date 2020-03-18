const schedule = require('node-schedule')
module.exports = app =>{
    schedule.scheduleJob('*/1 * * * *',async function(){
        const userCount = await app.db('users').count('id').first()
        const catCount = await app.db('categories').count('id').first()
        const artCount = await app.db('articles').count('id').first()

        const {Stat} = app.api.stat

        const lastStat= await Stat.findOne({},{},{sort:{'createdAt': -1}})

        const stat = new Stat({
            users: userCount.count,
            categories: catCount.count,
            articles:artCount.count,
            createdAt: new Date()
        })
        const changeUsers= !lastStat || stat.users !==lastStat.users
        const changeCategories= !lastStat || stat.Categories !==lastStat.Categories
        const changeArticles= !lastStat || stat.Articles !==lastStat.Articles

        if(changeArticles || changeArticles || changeUsers){
            stat.save().then(()=>console.log('stats atualizadas'))
        }
    })
}