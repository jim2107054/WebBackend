export const signUp = async (req, res) => {
   
    try {
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while signing up" });
    }
};