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

router.get('/profile/:id', isLoggedIn, (req, res, next) => {
  let myUserId = req.session.loggedInUser._id;
  UserModel.findById(myUserId)
  
  .then((user) => {
  res.status(200).json(user);
})
  .catch((err) => {
  next(err);
})
});

router.patch('/profile/:id/edit', (req, res, next) => {

  const {username, name, email, password, image} = req.body
  let id = req.params.id;
    UserModel.findByIdAndUpdate(id, {$set: {username: username, name: name, email: email, password: password, image: image}}, {new: true})
    .then((response) => {
      console.log("Edited profile")
      res.status(200).json(response)  
    })
    .catch((err) => {
      res.status(500).json({
            error: 'Something went wrong',
            message: err
  })
}) 
});



module.exports = router;