const async_handler = require("express-async-handler")
const { validationCreateAuthor, Author, validationUpdateAuthor } = require("../models/Author")
const path = require("path")
const { UploadImage_Cloudinary, RemoveImage_Cloudinary } = require("../utils/cloudinary")
const fs = require("fs")


/**---------------------
 * @method post
 * @route  /api/authors/
 * @desc create new Author
 * @access private
 ----------------------*/

module.exports.createAuthor = async_handler(async(req,res)=> {
    if(!req.file) {
        return res.status(400).json({msg:"This File required"})
    }
    // validation
    const {error} = validationCreateAuthor(req.body)
    if(error) {
        return res.status(400).json({msg:error.details[0].message})
    }
    const pathImage = path.join(__dirname , `../images/${req.file.filename}`)
    const data = await UploadImage_Cloudinary(pathImage)
    const author = await Author.create({
        fristname : req.body.fristname,
        lastname : req.body.lastname,
        nationalty : req.body.nationalty,
        image : {
            url : data.secure_url,
            publicId : data.public_id
        }
    })

    res.status(201).json({msg :"This Author created", author})
    fs.unlinkSync(pathImage)
})

/**---------------------
 * @method put
 * @route  /api/authors/:id
 * @desc Update Author with Id
 * @access private
 ----------------------*/

module.exports.UpdateAuthor = async_handler(async(req,res)=> {
    // validtion file image
    if(!req.file) {
        return res.status(400).json({msg:"This File required"})
    }
    // validation
    const {error} = validationUpdateAuthor(req.body)
    if(error) {
        return res.status(400).json({msg:error.details[0].message})
    }
    let author = await Author.findById(req.params.id)
    if(!author) {
        return res.status(400).json({msg:"No Author to update"}) 
    }
    // path image
    const pathImage = path.join(__dirname , `../images/${req.file.filename}`)
    // upload image in cloudinary
    const data = await UploadImage_Cloudinary(pathImage)  //{data.public_id , data.secure_url}
    if(author.image.publicId !== null){
        RemoveImage_Cloudinary(author.image.publicId)
    }
    author.image = {
        url : data.secure_url ,
        publicId : data.public_id
    }
    await author.save()
    
    author = await Author.findByIdAndUpdate(req.params.id ,{
        $set: req.body
    },{new:true})
    res.status(200).json({msg:"Updated Author" , author})
    fs.unlinkSync(pathImage)
})


/**---------------------
 * @method post
 * @route  /api/authors/upload-image
 * @desc Upload Image
 * @access private
 ----------------------*/
 module.exports.UploadImage = async_handler(async(req,res)=> {
    if(!req.file) {
        return res.status(400).json({msg:"This File required"})
    }
    res.status(200).json({msg:"Image is Uploaded!"})
 })


/**---------------------
 * @method get
 * @route  /api/authors/
 * @desc get All Author
 * @access private
 ----------------------*/

module.exports.GetAllAuthor = async_handler(async(req,res)=> {
    const authors = await Author.find()
    res.status(200).json({authors})
})

/**---------------------
 * @method get
 * @route  /api/authors/:id
 * @desc get Author by id
 * @access public
 ----------------------*/

module.exports.GetAuthorWithId = async_handler(async(req,res)=> {
    const author = await Author.findById(req.params.id)
    if(!author) {
        return res.status(400).json({msg:"No Author to show"}) 
    }
    res.status(200).json({author})
})

/**---------------------
 * @method delete
 * @route  /api/authors/:id
 * @desc delete Author by id
 * @access private
 ----------------------*/

module.exports.deleteAuthorWithId = async_handler(async(req,res)=> {
    const author = await Author.findById(req.params.id)
    if(!author) {
        return res.status(400).json({msg:"No Author to show"}) 
    }
    await Author.findByIdAndDelete(req.params.id)
    RemoveImage_Cloudinary(author.image.publicId)
    res.status(200).json({msg:"Author Deleted!"})
})