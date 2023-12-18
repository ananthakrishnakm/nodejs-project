
const express =require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser = require("body-parser");
const path=require("path"); 
const cors = require("cors");
const connectDB=require('./server/database/connection');
const multer = require('multer');
const collection=require("./server/model/loginSchema")
const session = require("express-session");


const app=express();

dotenv.config({path :'config.env'}) 
const PORT=process.env.PORT||8080 

// log requests
app.use(morgan('tiny'))

app.use(express.json());

// mongodb connection
connectDB();

// parse request to nbody-parser 
app.use(bodyparser.urlencoded({extended:true}))

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "12345",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000,
        },
    })
);


//set view engine
app.set("view engine","ejs") 
// app.set("views",path.resolve(--dirname,"views/ejs"))
 


// Define the storage strategy for file uploads
const storage = multer.memoryStorage();
// Initialize multer with the storage strategy
const upload = multer({ storage: storage });



//load assets
app.use ('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use ('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use ('/js',express.static(path.resolve(__dirname,"assets/js")))
// app.use ('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use ('/avatars',express.static(path.resolve(__dirname,"avatars")))
 
// load routers
app.use('/',require('./server/routes/router'))







app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)}); 
