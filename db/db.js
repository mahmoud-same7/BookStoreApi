const mongoose = require("mongoose")



module.exports.connectDB = async()=> {
    try {
            await mongoose.connect(process.env.URL_DB)
            console.log("connectDB ^-^")
    } catch (error) {
       console.log(error) 
    }
}