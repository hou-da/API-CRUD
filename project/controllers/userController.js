

const mongodb =require('mongodb')
const validator = require('validator')

const bcrypt = require('bcrypt');
const expect = require('expect') 
const User = require("../models/user.model");


exports.getSignup = (req, res, next) =>{
        res.render("signup");
    };


exports.postSignup = (req, res) => {
    let { UserName, email, Password} = req.body
        
    if (UserName == "" || email == "" || Password == "" ){
        res.status(401).json({
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z]+$/.test(UserName)){
        res.status(401).json({
            message: "Invalid name entered"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){  
        res.status(401).json({
            message: "Invalid email entered"
        })
    } else if (Password.length<6){
        res.status(401).json({
            message: "Password is too short!"
        })
    
    } else {
         //cheking if user already existes
        User.find({email}).then(result => {
            if(result.length) {
                return res.status(401).res.json({
                    message : "User with the provided email alredy exixtes"
                })           
                 
        } else {
            //try to create new user
            // password handlling
                    
            bcrypt.hash(Password, 6).then(hashpwd => {
                const user = new User({
                    UserName,
                    email,
                    Password:hashpwd
                });
            user.save()
            res.render('login')
                
            })
        }
    
    })
    .catch(err => {
       return res.status(500).json({err,
             message:'An error occurred while cheking for existing user!'
        })
    })
            
    }
}


exports.getLogin = (req, res, next) =>{
    res.render("login");
}

exports.postLogin = async (req, res, next) =>{
  
    try{
        const {UserName, email, Password} = req.body;
    
        // email = (email || '').trim();
        // Password = (Password || '').trim();
        if ( email == "" || Password == "" ){
            return res.status(400).json({
                message: "Empty input fields!"
            })
        }
        const user = await User.findOne({email:email}) 
        
        if (!user) {
             return res.status(400).json( {
                message :"User not found",
                     
            
            })
        } else {
            // // comparing given password with hashed password
            // bcrypt.compare(Password, user.Password).then(function (result) {
            //   //result
            //     res.status(200).json({
            //         message: "Login successful",
            //         user,
            //       })
            //      res.status(400).json({ message: "Login not succesful" })
            // })
            const isMatch = await bcrypt.compare(Password, user.Password);
            if(!isMatch){
                return res.status(400).json({
                    message: "Login not successful",
                  })
            }else{
               res.redirect('/list-job')
            }
          }
        } 
    
    catch(err){
       return res.status(500).json({
            message: err,
          })
    }
    
}