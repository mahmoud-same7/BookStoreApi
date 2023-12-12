const asyncHandler = require("express-async-handler")
const { valiadtionCreateBook, Book, valiadtionUpdatebook } = require("../models/Book")

/**----------------------------
 * @method post
 * @desc    create new book
 * @route   /api/admin/createBook
 * @access  private (only Admin)
 ----------------------------*/

 module.exports.CreateBook = asyncHandler(async(req,res)=> {
    //validtion
    const {error} = valiadtionCreateBook(req.body)
    if(error) {
        return res.status(400).json({msg: error.details[0].message})
    }
    // create new book
    const book = await Book.create({
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        author : req.user.id
    })
    res.status(201).json({msg:" create success!" , book})
 })

/**----------------------------
 * @method get
 * @desc    get all books
 * @route   /api/getAllBooks
 * @access  public 
 ----------------------------*/

 module.exports.GetAllBooks = asyncHandler(async(req,res)=> {
    const books = await Book.find().populate("author")
    res.status(200).json(books)
 })

/**----------------------------
 * @method get
 * @desc    get book by id
 * @route   /api/getAllBooks/:id
 * @access  public
 ----------------------------*/

 module.exports.GetBookWithId = asyncHandler(async(req,res)=> {
    // check book is found or not
    const book = await Book.findById(req.params.id)
    if(!book) {
        return res.status(404).json({msg:"This Book Is Not Found By This Id"})
    }
    res.status(200).json(book)
 })

/**----------------------------
 * @method put
 * @desc    update Book By Id
 * @route   /api/updateBook/:id
 * @access  private (only admin)
 ----------------------------*/

 module.exports.updateBookWithId = asyncHandler(async(req,res)=> {
    // valiadtion
    const {error} = valiadtionUpdatebook(req.body)
    if(error) {
        return res.status(400).json({msg: error.details[0].message})
    }
    // check book is find or not
    let book = await Book.findById(req.params.id)
    if(!book) {
        return res.status(404).json({msg:"This Book Is Not Found By This Id"})
    }
    book = await Book.findByIdAndUpdate(req.params.id ,{
        $set:req.body
    },{new:true})
    res.status(200).json({msg:"book Updated!" , book})
 })

 /**----------------------------
 * @method delete
 * @desc    delete book with id
 * @route   /api/deleteBook/:id
 * @access  private (only Admin)
 ----------------------------*/

 module.exports.DeleteBookWithId = asyncHandler(async(req,res)=> {
    // check book is found or not
    const book = await Book.findById(req.params.id)
    if(!book) {
        return res.status(404).json({msg:"This Book Is Not Found By This Id"})
    }
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Book Deleted"})
 })