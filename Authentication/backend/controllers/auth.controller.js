import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup
// This function will be called when the user sends a POST request to /api/auth/signup
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
        // Pass an object containing the user ID to generateToken
        let token = generateToken({ id: user._id });

        res.cookie("token", token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:1000*60*60*24*30// write maxAge in milliseconds
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "An error occurred while signing up", error: error.message });
    }
};

// Login
// This function will be called when the user sends a POST request to /api/auth/login
export const Login = async (req,res) =>{
     let {email,password} = req.body;
     try{
        if(!email){
            return res.status(400).json({message:"Please provide email"});
        }
        if(!password){
            return res.status(400).json({message:"Please provide password"});
        }

        // Check if user exists
        let userAse = await User.findOne({email});

        //if user exists, then all the things we will get in userAse
        //userAse will be an object, khela hobe atak diye. ar porer sob kaj hobe aita dia.

        if(!userAse){
            return res.status(400).json({message:"User does not exist"});
        }

        //check password with the hashed password
        let passwordMatch = await bcrypt.compare(password,userAse.password);
        if(!passwordMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        //Generate token
        // Pass an object containing the user ID to generateToken
        let token = generateToken({ id: userAse._id });

        // Send the token in a cookie, so that the client can store it.
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:1000*60*60*24*30// write maxAge in milliseconds
        })

        return res.status(200).json({message:"Logged in successfully"});
        
     }
     catch(error){
         console.error("Login error:",error);
         return res.status(500).json({message:"An error occurred while logging in",error:error.message});
     }
}