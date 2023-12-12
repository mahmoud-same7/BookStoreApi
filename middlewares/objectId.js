const mongoose = require("mongoose")

module.exports.objectId = (req ,res ,next)=> {
        if(! mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({msg:"This Id Incorrect!"})
        }
        next()
}