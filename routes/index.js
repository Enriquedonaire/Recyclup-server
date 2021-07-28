const router = require("express").Router();
const express = require('express')   
const ItemModel = require('../models/Items.model')


//return res.json on server side (no render)
router.get("/", (req, res, next) => {            //show our landing page with 10 random items 
  ItemModel.find()
  .then((items) => {
   
    res.status(200).json(items)
  
  })

  .catch((err) => {
    next(err);
  })

})

  /*  res.render('auth/main.hbs', {general, programming, knock, jokes, myUserId, randomJoke, jokeProgramming, jokeGeneral, jokeKnock})
  })
 ;   */ //what the hell is this??




// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
