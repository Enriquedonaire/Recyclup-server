const express = require('express')            //CHANGE THIS TO ITEM-ROUTES!!
const router = express.Router()

const ItemModel = require('../models/Items.model')
const UserModel = require('../models/User.model')


// personal profile route


router.get('/profile/:id', checkLoggedIn, (req, res, next) => {
  let myUserId = req.session.loggedInUser._id;
  UserModel.findById(myUserId)
//   .populate("")
  .then((user) => {
  res.render('/profile');
})
  .catch((err) => {
  next(err);
})

});





module.exports = router;