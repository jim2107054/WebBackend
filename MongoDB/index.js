import express from 'express';
import mongoose from 'mongoose';
import User from './models/user_model.js';//import the model to perform CRUD operations. 

const app = express();
const port = 8000;

const mongoURL = "mongodb+srv://mdjahidhasanjim277:jim205@cluster0.7tyu4.mongodb.net/DataBase_Name";

//when we are connecting our database with our server, we will create a function.

//we will use async and await to connect our database with our server.
//we will use try and catch block to handle the error. If some error occurs, it will be caught by the catch block and the error message will be shown in the console.

const connectDB = async () => {//we will call it when our server starts. so we will call it in the app.listen function.
  try {
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection failed');
    console.log(error);
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//*********** Connect with DataBase. Now we perform CRUD operation. *******************//
//create a middleware to parse the incoming data.
app.use(express.json());

app.post('/create', async (req, res) => {
  //logic to create a user
  try {
    // const user = new User({
    //   name: 'Jahid Hasan Jim',
    //   age: 25,
    //   email: 'mdjahidhasan@gmail.com',
    //   userName: 'Jim'
    // });
    let { name, age, email, userName } = req.body;
    const user = await User.create({ // we create an User and store them in 'user' variable. 
      name,
      age,
      email,
      userName //as key and value are same, we can write it once. If they are different, we have to write it twice. like name:name(key:value)
    })
    res.status(201).json({message:"User created successfully",user});//201 means that the user is created successfully.
  }
  catch (error) {
    res.status(500).json({message:"Internal server error"});//500 means that there is some internal server error.
    console.log(error);
  }
  res.send('Create User');
});


app.listen(port, () => {
    connectDB();//After starting the server, we will call the connectDB function.
    console.log(`Server started at http://localhost:${port}`);
});