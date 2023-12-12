const express= require("express")
const { connectDB } = require("./db/db")
const helmet = require("helmet")
const { errorPath, HandleError } = require("./middlewares/handleError")

const app = express()

require("dotenv").config()
app.use(helmet())

app.use(express.json())

connectDB()


app.use("/api/books" , require("./routes/book"))
app.use('/api/auth' , require("./routes/auth"))
app.use('/api/users' , require("./routes/user"))
app.use('/api/authors' , require("./routes/author"))

// handle error
app.use(errorPath)
app.use(HandleError)

const PORT = process.env.PORT|| 8000
app.listen(PORT , ()=> {console.log(`Server is Running on port ${PORT}`)})