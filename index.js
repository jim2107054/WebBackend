//***********node.js code for creating a server. *******//

// import http from 'http';

// const port = 8000;

// // const server = http.createServer((req,res)=>{
// //     res.end('Welcome to the server');
// //     res.end("I am Jim");
// // })

// // server.listen(port);

// const server = http.createServer((req,res)=>{
//     //create for different port.
//     if(req.url =="/"){
//         res.end('Welcome to the Home page.');
//     }
//     else if(req.url == "/about"){
//         res.end('Welcome to the about page.');
//     }
//     else if(req.url == "/contact"){
//         res.end('Welcome to the contact page.');
//     }
//     else{
//         res.end('404 page not found!');
//     }
// })

// server.listen(port,()=>{
//     console.log('server is running..........');
// });



//********** Express.js for creating server. **************//

import express from 'express';
const app = express();// we can access all the things, which are present in express.
const port = 8000;

// app.get("which route",callbackfucntion) => get request.
app.get("/",(req,res)=>{
    // res.end('Welcome to the Home page. I am Jim');
    res.send('Welcome to Home Page. Same will work for this.'); 
})

app.get("/about",(req,res)=>{
    res.send('Welcome to the about page.');
})

app.get("/contact",(req,res)=>{
    res.end('Welcome to the contact page.');
})

app.get("*",(req,res)=>{// * means all the routes.
    res.end('404 page not found!');
})

app.listen(port,()=>{
    console.log('server is running..........');
    console.log(`server is start running at port ${port}`); 
})