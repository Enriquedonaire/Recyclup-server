//Libraries:
const express = require('express')
const bcrypt = require('bcryptjs');  
const randomstring = require("randomstring"); //this is a library for the confirmation mail
const nodemailer = require("nodemailer");  //this one is also for the confirmation mail
const session = require('express-session')  //library to store the user's session
const MongoStore = require('connect-mongo');
const axios = require('axios');

const router = express.Router()
const UserModel = require('../models/User.model');

//_______SIGNUP______________________________________________
router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;
    const mailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   
    const passRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/;
    const salt = bcrypt.genSaltSync(12) 
    const securePW = bcrypt.hashSync(password, salt)
 
    // Checking if signin form is fully filled in
    if (!username || !email || !password) {
        res.status(500)
          .json({
            errorMessage: 'Please fill in all the fields to continue.'
          });
        return;  
    }
    
    if (!mailRegex.test(email)) {
        res.status(500).json({
          errorMessage: 'Your email must be of a valid format, e.g. hello@mail.com'
        });
        return;  
    }
  
    if (!passRegex.test(password)) {
      res.status(500).json({
        errorMessage: 'Your password needs to have at least 9 characters, a number and an Uppercase letter.'
      });
      return;  
    }

    //check if username is unique
    UserModel.findOne({username})
    .then((username) => {
      if(username){
        res.status(500).json({
            errorMessage:`Sorry, the username ${user.username} is already used by someone else. Please choose another one.`
    });
        return
      }
    })
    .catch(() => {
      next();
    });
    

   // salting and hashing the entered password
    UserModel.create({username, email, password: securePW})
      .then((user) => {
        // to not even share hash password with user:
        user.password = "***";
        res.status(200).json(user);
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(500).json({
            errorMessage: 'Username or email entered already exist!', //remember to set up "Reset Password/username?"
            message: err,
          });
        } 
        else {
          res.status(500).json({
            errorMessage: 'Sorry! Something went wrong!',
            message: err,
          });
        }
      })
});
 
/*
//route to send confirmation mail when signup posted
const confirmationCode = randomstring.generate(20); 
const message = `Dear new community member, this is to confirm your RecyclUp account. Please click on the following URL to verify your account: http://localhost:3000/confirm/${confirmationCode} See you soon, your Recyclupteam :)`;
// let { email, username } = req.body;
let transporter = nodemailer.createTransport({
  service: "Gmail",                       //we can change this
  auth: {
    user: process.env.NM_USER,          //create the .env file with this data
    pass: process.env.NM_PASSWORD, 
  },
});

transporter
  .sendMail({
    //from: '"Upcyclup" <hello.team.upcyclup@gmail.com>',  //still need to create an email 
    to: email,
    subject: "Welcome to Upcyclup- Please confirm your account",
    text: message,
    html: `<b>${message}</b>`,
  })
.then(() => {
UserModel.create({ username, email, password: securePW, confirmationCode, status: "Pending confirmation"})
  .then(() => {
    res.status(204).json({message:"Thanks for signing up. We sent you an email to confirm your account." })
  })

  .catch((err) => {
    res.status(500).json({
      errorMessage: "Sorry, something went wrong. Please sign up again."
    });
  });
});  

router.get("/auth/confirm/:confirmationCode",(req, res, next) => {
    UserModel.findOneAndUpdate({confirmationCode: req.params.confirmationCode}, {status: 'Active'})
      .then(()=> {
        res.json({})     //have to create corresponding client side route 
      })
      .catch((err)=> {
        res.status(500).json({error: "Something went wrong, please sign up again."})
  
    })  */


//________________________________________________________________________________________________________




//___________SIGNIN_________________
// will handle all POST requests to http:localhost:5005/api/signin
router.post('/signin', (req, res) => {
    const {username, password } = req.body;
    
    if ( !username || !password) {
        res.status(500).json({
            error: 'Please enter your username and password.',
       })
      return;  
    }
   
    if (!mailRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }

  
    // checks if the user exists in the database 
    UserModel.findOne({email})
      .then((userData) => {

        if(user.status !=='Active'){
            res.render("index", {error: 'Please confirm your account first'})   
            return 
        }


           //check if passwords match

           if(user)
          bcrypt.compare(password, userData.securePW)
            .then((doesItMatch) => {
                //if it matches
                if (doesItMatch) {
                  // req.session is the special object that is available to you
                  userData.securePW = "***";
                  req.session.loggedInUser = userData;
                  res.status(200).json(userData)
                }
                //if passwords do not match
                else {
                    res.status(500).json({
                        error: 'Wrong password!',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      //throw an error if the user does not exists 
      .catch((err) => {
        res.status(500).json({
            error: 'This email does not exist',
            message: err
        })
        return;  
      });
  
});
 
//____________LOGOUT_________________
// will handle all POST requests to http:localhost:5005/api/logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    // Nothing to send back to the user
    res.status(204).json({});
})


// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {  
  req.session.loggedInUser? next() : res.status(401).json({
          message: 'Please login to continue.',
          code: 401,
      })
  };


// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

module.exports = router;