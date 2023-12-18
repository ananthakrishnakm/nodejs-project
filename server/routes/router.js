
const express=require('express');
const route= express.Router()
const path = require('path')
const services =require('../services/render');
const controller=require('../controller/controller');
const authentication=require('../controller/authentication');
const {isAuthenticated} = require('../services/authenticate');

/**
*@description Root Route
*@method GET/
*/

// route.get('/',services.homeRoutes);
route.get("/register",services.registerRoutes)
route.post("/register",authentication.register)

route.get("/login",services.loginRoutes)
route.post("/login",authentication.login)

route.get("/logout", authentication.logout)
/**
*@description index
*@method GET/
*/

route.get('/view/',services.viewEmployee);
route.get("/",isAuthenticated,services.homeRoutes);

/**
*@description viewemployee
*@method GET/
*/

 //api
 route.post('/api/users',controller.create)
 route.get('/api/users',controller.find)
 route.get('/api/users/search',controller.search)
 route.put('/api/users/:id',controller.update)
 route.delete('/api/users/:id',controller.delete)




// get render home page
route.get('/', services.homeRoutes);

// route.get('/add-user',services.add_user)

// route.get('/update-user',services.update_user)  

module.exports=route