const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name :process.env.CLOUD_NAME,
    api_key : process.env.API_KEY ,
    api_secret :process.env.API_SECRET
})



const UploadImage_Cloudinary = async(pathImage)=> {
    try {
        const data = await cloudinary.uploader.upload(pathImage , {
            resource_type : "auto"
        })
        return data
    } catch (error) {
        return error
    }
}



const RemoveImage_Cloudinary = async(publicId)=> {
    try {
        const result = await cloudinary.uploader.destory(publicId)
        return result
    } catch (error) {
        return error
    }
}

module.exports = {
    UploadImage_Cloudinary ,
    RemoveImage_Cloudinary
}