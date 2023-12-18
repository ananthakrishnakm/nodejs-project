const axios=require('axios');

exports.homeRoutes=(req,res)=>{
    // make a get request to /api/users
    axios.get(' http://localhost:3000/api/users')
    .then(function(response){
        console.log(response)
        res.render('index',{users:response.data});
        // res.render('index');

    })
    .catch(err=>{
    res.send(err);
})
}

exports.loginRoutes=(req,res)=>{
    res.render('login');
}
exports.registerRoutes=(req,res)=>{
    res.render('register');
};

exports.viewEmployee=(req,res) =>{
    res.render('viewdetailes')
};

// exports.add_user=(req,res)=> {
//     res.render('add_user');
// }

// exports.update_user=(req,res)=>{
//     res.render('update_user');
// }
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/")
    });
}