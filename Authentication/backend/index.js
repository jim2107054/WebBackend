import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

let app = express();

let port = process.env.PORT || 4000;//if we don't have port in env file then it will run on 4000

// Middleware 
app.use(express.json());
app.use(cookieParser());//we are using cookie parser to parse the cookies, sothat when token is sent in the cookie, we can parse it and use it

// All the middlewares should be above the routes, otherwise the routes will not be able to use the middlewares
app.use("/api/auth",authRouter); // we are using the authRouter from the auth.routes.js file. because we want to use the routes from that file

app.get("/",(req,res)=>{
  res.send("Server is running");
})

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

