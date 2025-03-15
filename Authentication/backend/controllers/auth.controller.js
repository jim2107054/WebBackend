import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
      //console.log("Request received:", req.body); 

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        const { firstName, lastName, userName, email, password } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        // Check if user already exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        //Generate token
        let token = generateToken(user._id);

        res.cookie("token", token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            samesite:"strict",
            maxAge:1000*60*60*24*30// write maxAge in milliseconds
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "An error occurred while signing up", error: error.message });
    }
};
