import mongoose from "mongoose";

//create Schema syntax.
//const userSchema = new mongoose.Schema({Schema Design -> what properties should it contain },{timestamps:true});//timestamps:true means that it will automatically create two fields in the database. One is createdAt and another is updatedAt. It will automatically update the updatedAt field when we update the data.
//timestamps:true is optional. If we don't want to use it, we can remove it.

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, //unique means that the email should be unique. No two users can have the same email.
        lowercase:true //lowercase means that the email will be converted to lowercase before saving it to the database.
    },
    userName:{
        type:String,
        required:true,
        unique:true//unique means that the userName should be unique. No two users can have the same userName.
    },
},{timestamps:true});

//create a model syntax. To perform CRUD operations, we need to create a model.
//const Model_Name = mongoose.model('Model_Name' => we can see this in mongoDB =>**usually we use simillar model name.**,Schema Name);//User is the name of the model and userSchema is the schema of the model.
const User = mongoose.model('User',userSchema);
export default User;//export the model so that we can use it in other files.

//  we are writing the CRUD operation code in index.js file. as we export the model, we can use it in the index.js file. We can import the model in the index.js file and use it to perform CRUD operations. We can create a new user, read the user, update the user, and delete the user using this model. We can perform all the CRUD operations using this model. We can also perform other operations like sorting, filtering, etc.