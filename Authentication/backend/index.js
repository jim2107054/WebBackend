import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

let port = process.env.PORT || 8000;//if we don't have port in env file then it will run on 8000

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});