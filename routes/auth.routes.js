//Libraries:
const express = require('express')
const bcrypt = require('bcryptjs');  
const randomstring = require("randomstring"); //this is a library for the confirmation mail
const nodemailer = require("nodemailer");  //this one is also for the confirmation mail
const session = require('express-session')  //library to store the user's session
const MongoStore = require('connect-mongo');
const axios = require('axios');
const express = require('express')


const router = express.Router()
const UserModel = require('../models/User.model');


//_______________SIGN UP_____________
router.post('/signup', (req, res) => {
    const {username, name, email, password } = req.body;    //why name here? we dont use it in form
    console.log(name, email, password);
    //DO NOT DELETE THESE REGEXES!!!!!!!PLEASE!!!!!:::
    const mailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   
    const passRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);


//Validators below: check email format, password strength, username unique, form filled out, and ONLY THEN create user:
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
    errorMessage: 'Your password needs to have at least 9 characters, a number and an uppercase letter.'
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
    return;
  }
})
.catch(() => {
  next();
});

//...after everything validated, only THEN we create the usermodel
        UserModel.create({username: username, name : name, email: email, passwordHash: hash})
        .then((user) => {
            
            user.passwordHash = "***";
            res.status(200).json(user);
        })
        .catch((err) => {
            if (err.code === 11000) {
            res.status(500).json({
                errorMessage: 'username or email entered already exists!',
                message: err,
            });
            } 
            else {
            res.status(500).json({
                errorMessage: 'Something went wrong! Go to sleep!',
                message: err,
            });
            }
        })
    });


//________NODEMAILER: When user signs up, she gets a confirmation mail!!!:

//confirmation mail when signup posted
const confirmationCode = randomstring.generate(20); 
const message = `Dear new community member, this is to confirm your RecyclUp account. Please click on the following URL to verify your account: http://localhost:3000/confirm/${confirmationCode} See you soon, your Recyclupteam :)`;
// let { email, username } = req.body;
let transporter = nodemailer.createTransport({
  service: "Gmail",                       
  auth: {
    user: process.env.NM_USER,          
    pass: process.env.NM_PASSWORD, 
  },
});

transporter
  .sendMail({
    //from: '"Upcyclup" <hello.recyclup@gmail.com>',  
    to: email,                                              //user email
    subject: "Welcome to Recyclup- Please confirm your account",
    text: message,
    html: `<b>${message}</b>`,
  })
.then(() => {
UserModel.create({ username, email, password: hash, confirmationCode, status: "Pending confirmation"})
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
  
    })  
        })      

//________________________________________________________________________________________________________

    //___________SIGN IN_____________________
    
    router.post('/signin', (req, res) => {
        const {email, password } = req.body;      //you changed this form. initially it was signin with username & password

    //check if sign in is valid first: all fields filled out? 
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please fill in all fields.',
    })
    return;  
    }

    if(user.status !=='Active'){
        res.render("index", {error: 'Please confirm your account first'})   
        return 
    }

        UserModel.findOne({email})
        .then((userData) => {
            bcrypt.compare(password, userData.passwordHash)
                .then((doesItMatch) => {
                    if (doesItMatch) {
                    userData.passwordHash = "***";
                    req.session.loggedInUser = userData;
                    res.status(200).json(userData)
                    }
                    else {
                        res.status(500).json({
                            error: 'Passwords don\'t match',
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
        .catch((err) => {
            res.status(500).json({
                error: 'Email does not exist',
                message: err
            })
            return;  
        });
    
    });


    //________LOGOUT
    router.post('/logout', (req, res) => {
        req.session.destroy();
        res.status(204).json({});
    })


    const isLoggedIn = (req, res, next) => {  
    if (req.session.loggedInUser) {
        next()
    }
    else {
        res.status(401).json({
            message: 'Unauthorized user',
            code: 401,
        })
    };
    };

    router.get("/user", isLoggedIn, (req, res, next) => {     
    res.status(200).json(req.session.loggedInUser);
});

module.exports = router;