const mongoose = require("mongoose")
const Joi = require("joi")


const SchemaBook = new mongoose.Schema({
    title: {
        type: String ,
        trim:true ,
        require: true,
        minlength:2,
        maxlength:20
    },
    description: {
        type: String ,
        trim:true ,
        require: true,
        minlength:2,
    },
    cover: {
        type: String,
        required: true,
        enum:["soft cover" , "hard cover"]
    } ,
    author :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author",
        default : null
    },
    price : {
        type : Number,
        default: 0,
        min:0
    }
} ,{timestamps:true})



const Book = mongoose.model("book" , SchemaBook)

const valiadtionCreateBook = (obj)=> {
    const schema = Joi.object({
        title : Joi.string().required().trim().min(2).max(15),
        description : Joi.string().required().trim().min(10),
        price : Joi.number().min(0),
         cover : Joi.string().valid("soft cover" , "hard cover").required()

    })
    return schema.validate(obj)
}

const valiadtionUpdatebook= (obj)=> {
    const schema = Joi.object({
        title : Joi.string().trim().min(2).max(15),
        description : Joi.string().trim().min(10),
        price : Joi.number().min(0),
        cover : Joi.string().valid("soft cover" , "hard cover")
    })
    return schema.validate(obj)
}


module.exports = {
    Book,
    valiadtionCreateBook ,
    valiadtionUpdatebook
}