const {User, validationRegister, validationLogin, validationUpdateUser} =require("../models/User")
const async_handler = require("express-async-handler")
const bcrypt = require("bcrypt")




module.exports.register = async_handler(async (req,res)=> {
    // validtion
   const {error}  = validationRegister(req.body)
   if(error) {
    return res.status(400).json({msg : error.details[0].message})
   }
   // check email is find or not
   let user = await User.findOne({email:req.body.email})
   if(user) {
     return res.status(400).json({msg :"This email Already register!"})
   }
   //hash password
   const salt = await bcrypt.genSalt(10)
   req.body.password = await bcrypt.hash(req.body.password ,salt)
   // create new user
   user = await User.create(req.body)
   res.status(201).json({msg:"Register is successfully , please login"})

})




module.exports.Login = async_handler(async (req,res)=> {
    // validtion
   const {error}  = validationLogin(req.body)
   if(error) {
    return res.status(400).json({msg : error.details[0].message})
   }
   // check email is find or not
   let user = await User.findOne({email:req.body.email})
   if(!user) {
     return res.status(400).json({msg :" email or password Incorrect!"})
   }
   // check correct Password
   const passMatch = await bcrypt.compare(req.body.password,user.password)
   if(!passMatch) {
    return res.status(400).json({msg :" email or password Incorrect!"})
   }
   // create token
   const token = user.token()
   //response to client
   res.status(200).json({msg:"login sucessfully!" ,id: user._id ,token})
})


/**----------------------------------
 * @method get
 * @desc  get All users
 * @route /api/users
 * @access private (only admin)
 *-----------------------------------*/

module.exports.getAllUsers = async_handler(async(req,res)=> {
  const users = await User.find().select("-password")
  res.status(200).json({users})
}) 


/**----------------------------------
 * @method get
 * @desc  get user by id
 * @route /api/users/:id
 * @access public
 *-----------------------------------*/

module.exports.getUserWithId = async_handler(async(req,res)=> {
  const user = await User.findById(req.params.id).select("-password")
  if(!user) {
    return res.status(400).json({msg:"This User is not found!"})
  }
  res.status(200).json(user)
}) 

/**----------------------------------
 * @method put
 * @desc  update user by id
 * @route /api/users/:id
 * @access private( only Admin or userHimself)
 *-----------------------------------*/

module.exports.updateUser = async_handler(async(req,res)=> {
  // validation
  const {error} =  validationUpdateUser(req.body)
  if(error) {
    return res.status(400).json({msg:error.details[0].message})
  }
  // check user is find or not
  let user = await User.findById(req.params.id)
  if(!user) {
    return res.status(404).json({msg:"This user is not found!"})
  }
  // check update password
  if(req.body.password) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password ,salt)
  }
  user = await User.findByIdAndUpdate(req.params.id ,{
    $set:req.body
  },{new: true})
  res.status(200).json({msg:"User Updated!" , user})
}) 


/**----------------------------------
 * @method delete
 * @desc  delete user by id
 * @route /api/users/:id
 * @access private( only Admin or userHimself)
 *-----------------------------------*/

module.exports.deleteUser = async_handler(async(req,res)=> {
  const user = await User.findById(req.params.id).select("-password")
  if(!user) {
    return res.status(400).json({msg:"This User is not found!"})
  }
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({msg:"User Deleted"})
}) 