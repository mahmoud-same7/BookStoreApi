const mongoose = require("mongoose")
const Joi = require("joi")


const authorSchema = mongoose.Schema({
    fristname: {
        type: String,
        min: 2,
        max: 20,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        min: 2,
        max: 20,
        required: true,
        trim: true
    },
    nationalty: {
        type: String,
        min: 2,
        max: 20,
        required: true,
        trim: true
    },
    image: {
        type : Object ,
        default :{ 
            url :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId: null
        }
    }
},{timestamps:true})


const Author = mongoose.model("author" , authorSchema)

const validationCreateAuthor = (obj)=> {
    const schema = Joi.object({
        fristname: Joi.string().trim().min(2).max(20).required(),
        lastname: Joi.string().trim().min(2).max(20).required(),
        nationalty: Joi.string().trim().min(2).max(20).required(),
    })
    return schema.validate(obj)
}

const validationUpdateAuthor = (obj)=> {
    const schema = Joi.object({
        fristname: Joi.string().trim().min(2).max(20),
        lastname: Joi.string().trim().min(2).max(20),
        nationalty: Joi.string().trim().min(2).max(20),
    })
    return schema.validate(obj)
}

module.exports = {
    Author,
    validationCreateAuthor,
    validationUpdateAuthor
}