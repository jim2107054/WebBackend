import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';//fs is a core module in node.js, it is used to read files

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//create a function to upload image
const uploadOnCloudinary = async (file) => {//file is the image that we want to upload, it will be passed from the frontend, it will be passed as a parameter(in url form)
    try {

        if(!file){//if file is not present
            return null;
        }

        let result = await cloudinary.uploader.upload(file);//we will get a url in return and store it in result
        fs.unlinkSync(file);//delete the file from the local server
        return result.secure_url;//the image is uploaded to cloudinary and we get a url in return and we store this url in the database
    } catch (error) {
        fs.unlinkSync(file);//if there is an error, we will delete the file from the local server
        console.log(error);
    }
}

export default uploadOnCloudinary;