const jwt = require("jsonwebtoken")

function verfiytoken(req,res ,next) {
    const AuthToken = req.headers.authorization // "Bearar token"
    if(AuthToken) {
        const token = AuthToken.split(" ")[1]
        try {
                const decode = jwt.verify(token , process.env.SECRET_KEY)
                req.user = decode  // {id , isAdmin}
                next()
        } catch (error) {
           return res.status(401).json({msg:"This Token Incorrect"})
        }
    }else {
       return res.status(401).json({msg :" This Token is Not Provided"})
    }
}

function verfiytokenAndAdmin(req,res,next) {
    verfiytoken(req,res,()=> {
        if(req.user.isAdmin) {
            next()
        }else {
           return res.status(403).json({msg:"Access denied , only Admin"})
        }
    })
}
function verfiytoken_Admin_HimSelf(req,res,next) {
    verfiytoken(req,res,()=> {
        if(req.user.id === req.params.id || user.isAdmin) {
            next()
        }else {
           return res.status(403).json({msg:"Access denied , only Admin"})
        }
    })
}


module.exports = { 
    verfiytoken,
    verfiytokenAndAdmin,
    verfiytoken_Admin_HimSelf
}