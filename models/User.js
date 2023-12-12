const mongoose = require("mongoose")
const Joi = require("joi")
const JWT = require("jsonwebtoken")

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 12,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isverfided: {
        type: Boolean,
        default: false
    },
},{timestamps:true})

schemaUser.methods.token = function() {
    return JWT.sign({id: this._id , isAdmin: this.isAdmin} ,process.env.SECRET_KEY )
}
const User = mongoose.model("user" , schemaUser)

const validationRegister = (obj)=> {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(12).required(),
    })
    return schema.validate(obj)
}
const validationLogin = (obj)=> {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).max(12).required(),
    })
    return schema.validate(obj)
}

const validationUpdateUser = (obj)=> {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(20),
        email: Joi.string().trim().email(),
        password: Joi.string().trim().min(8).max(12),
    })
    return schema.validate(obj)
}

const validationForgetPass = (obj)=> {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
    })
    return schema.validate(obj)
}



module.exports = {
    User,
    validationRegister,
    validationLogin,
    validationUpdateUser,
    validationForgetPass ,
}