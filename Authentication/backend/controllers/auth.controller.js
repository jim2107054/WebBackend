import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        console.log("Request received:", req.body);  // ✅ Debugging line

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        const { firstName, lastName, userName, email, password } = req.body;
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "An error occurred while signing up", error: error.message });
    }
};
