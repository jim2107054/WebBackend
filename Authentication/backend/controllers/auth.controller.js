import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        // for signing up a user. user will provide firstName, lastName, userName, email, password, and profileImage
        const {firstName,lastName,userName,email,password} = req.body;
        //If user doesn't provide any of the above fields, then we will return a 400 status code with a message saying that the user didn't provide the required fields.
        if(!firstName || !lastName || !userName || !email || !password){
            return res.status(400).json({message:"Please provide all the required fields"});
        }

        // check if the user already exists
        const userExists = await User.findOne({email});//to check if the user already exists in the database. it return true or false.
        if(userExists){
            return res.status(400).json({message:"user already exists"});
        }
        //make the password hash, using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // create a new user
        const user = await User.create(
            {
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword
            }
        )
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while signing up" });
    }
}

export default signUp;