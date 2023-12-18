const mongoose =require('mongoose');
// const { create } = require('./model');
 
// const connect =mongoose.connect("mongodb://http://localhost:3000/userdbs");
// connect.then(()=>{
//     // check  databaser connect or not


//     console.log("database connected succesfully");
// })
// .catch(() => {
// console.log("database cannot connected");
// })

// create scheama

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },

    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
   
});
// collection part

const collection =new mongoose.model("loginschema",loginSchema);

module.exports=collection;