module.exports= app=>{
    app.router('/users').post(app.api.user.save)
}