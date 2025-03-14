import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();

let app = express();

let port = process.env.PORT || 4000;//if we don't have port in env file then it will run on 4000
app.use(express.json());
// Middleware
app.use("/api/auth",authRouter); // we are using the authRouter from the auth.routes.js file. because we want to use the routes from that file

app.get("/",(req,res)=>{
  res.send("Server is running");
})

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

