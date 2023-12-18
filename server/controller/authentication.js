const { request } = require("express");
const collection = require("../model/loginSchema");
const bcrypt = require("bcrypt");

// register
exports.register = async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };

  //check user already exits

  const existingUser = await collection.findOne({ email: data.email });
  // console.log(userdata);

  if (existingUser) {
    res.send("User already exists.");
  } else{
    try {
      const saltRounds = 10; //number of salt round for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; //replace the hash password with orginal pasword
      const userData = await collection.insertMany(data);
      req.session.user = userData;
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("error registering user");
    }
  }
};

// const userdata=await collection.insertMany(data);
// console.log (userdata);

exports.login = async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    console.log(check);
    // check if the username is not found
    if (!check) {
      return res.render("login", {
        errormessage: "*invalid email or password?",
      });
    }

    // combare the password from the database with plain text
    const ispasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (ispasswordMatch) {
      req.session.user=check;
      res.redirect("/")
    } else {
      return res.render("login", {
        errorMessage: "*INVALID email OR PASSWORD",
      });
    }
  } catch (error) {
    return res.render("login", {
      errorMessage: "error processing your request",
    });
  }
};


exports.logout = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.log(err)
      }
      res.redirect("/")
  });
}

// login

// .get("/",(req,res)=>{
//     res.render("login");
// });
// app.get("/register",(req,res)=>{
//     res.render("register");
// });
