import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },//minlength: 6 is used to set the minimum length of the password to 6 characters.
    //profileImage: { type: String, required:false }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;