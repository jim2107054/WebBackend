import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import express from "express";

const app = express();
app.use(express.json());

export const signUp = async (req, res) => {
    try {
        // Ensure req.body is defined
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        // Destructure required fields from req.body
        let { lastName, userName, email, password } = req.body;

        // Check if any required field is missing
        if (!lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        // Return the created user object in the response
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while signing up", error: error.message });
    }
}