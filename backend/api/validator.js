module.exports= app=>{
    function existOrError(value,msg){
        if(!value)throw msg
        if(Array.isArray(value) && value.length==0) throw msg
        if(typeof value==='string' && !value.trim()) throw msg
    
    }
    
    function notExistOrError(value,msg){
        try{
            existOrError(value,msg)
        }catch(msg){
            return
        }
        throw msg
    }
    
    function equalsOrError(a,b,c){
        if(a!==b)throw msg
    }
    return (existOrError,notExistOrError,equalsOrError)
}