const express = require('express')            //CHANGE THIS TO ITEM-ROUTES!!
const router = express.Router()

const ItemModel = require('../models/Items.model')
const UserModel = require('../models/User.model')


// personal profile route

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

router.get('/profile', (req, res, next) => {

  let myUserId = req.session.loggedInUser._id;

  console.log(myUserId,'user id fetch ?')
  
  UserModel.findById(myUserId)
  .populate("itemsId")
  .then((user) => {
  res.status(200).json(user);
})
  .catch((err) => {
  next(err);
})

});


module.exports = router;