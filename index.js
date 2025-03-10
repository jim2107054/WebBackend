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


let users = [
    {
      "id": 1,
      "name": "Alice Johnson",
      "position": "Software Engineer",
      "department": "IT",
      "email": "alice.johnson@company.com",
      "phone": "+1-555-1010",
      "salary": 75000,
      "joining_date": "2022-03-15"
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "position": "Data Analyst",
      "department": "Data Science",
      "email": "bob.smith@company.com",
      "phone": "+1-555-1020",
      "salary": 68000,
      "joining_date": "2021-07-20"
    },
    {
      "id": 3,
      "name": "Charlie Brown",
      "position": "Project Manager",
      "department": "Management",
      "email": "charlie.brown@company.com",
      "phone": "+1-555-1030",
      "salary": 90000,
      "joining_date": "2019-05-10"
    },
    {
      "id": 4,
      "name": "David Wilson",
      "position": "UI/UX Designer",
      "department": "Design",
      "email": "david.wilson@company.com",
      "phone": "+1-555-1040",
      "salary": 72000,
      "joining_date": "2023-01-25"
    },
    {
      "id": 5,
      "name": "Emily Davis",
      "position": "HR Manager",
      "department": "Human Resources",
      "email": "emily.davis@company.com",
      "phone": "+1-555-1050",
      "salary": 85000,
      "joining_date": "2020-09-05"
    }
]    

//middleware => it is a function that has access to the request and response object. client request => middleware => response.
app.use(express.json());//middleware for json data. 

// app.get("which route",callbackfucntion) => get request.
/* syntax to create server in express.
 app.[http method(get,post,...)]('route',callback)
 */
app.get("/",(req,res)=>{
    // res.end('Welcome to the Home page. I am Jim');
    res.send('Welcome to Home Page. I am Jim'); 
})

app.get('/users',(req,res)=>{
    res.send(users);
})

app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const existingUser = users.find((user)=>{
        return user.id == id;
    })
    if(existingUser){
        res.send(existingUser);
    }
    else{
        res.send('User not found');
    }
})

app.get("/about",(req,res)=>{
    res.send('Welcome to the about page.');
})

app.get("/contact",(req,res)=>{
    res.end('Welcome to the contact page.');
})

app.get("/json",(req,res)=>{//we can send response in json format also.
    // res.json({name:"jim",Dept:"cse",Roll:'54'})
    res.json([
        {
            name:"Jahid Hasan Jim",
            Dept:"CSE",
            Roll:'54',
            Height:'5.9'
        },
        {
            name:"Pritom",
            Dept:"CSE",
            Roll:52,
            Height:'5.75'
        },
        {
            name:"Spandan",
            Dept:"CSE",
            Roll:45,
            Height:'5.8'
        }
    ])
})

app.get("*",(req,res)=>{// * means all the routes.
    res.end('<p><h1>404</h1>page <strong>not</strong>found!</p>');//if we want, we can write html as well.
})

app.post("/",(req,res)=>{
    let body = req.body;
    console.log(body);
    res.send('Post request is called');
})

app.listen(port,()=>{
    console.log('server is running..........');
    console.log(`server is start running at port ${port}`); 
})

/*Instead of running each time, we can change our script file in package.json by installing nodemon.*/


