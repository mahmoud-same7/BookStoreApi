
const errorPath = (req ,res ,next)=> {
    const error = new Error(`This path not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const HandleError = ( err,req ,res )=> {
    const statusCode = res.statusCode === 200 ?500: res.statusCode
    res.status(statusCode).json({msg:err.message})
}


module.exports = {
    errorPath ,
    HandleError
}