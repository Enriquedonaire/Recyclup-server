const express = require('express')
const router = express.Router()


const bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model');

router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;
    console.log(username, email, password);
    

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        UserModel.create({name: username, email, passwordHash: hash})
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
    
    router.post('/signin', (req, res) => {
        const {email, password } = req.body;

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