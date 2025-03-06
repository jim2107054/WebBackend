import express from 'express';
import mongoose from 'mongoose';

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

app.listen(port, () => {
    connectDB();//After starting the server, we will call the connectDB function.
    console.log(`Server started at http://localhost:${port}`);
});