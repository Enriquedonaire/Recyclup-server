const express = require('express')            //CHANGE THIS TO ITEM-ROUTES!!
const router = express.Router()
const ItemModel = require('../models/Items.model')

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/items.
router.get('/items', (req, res) => {
     ItemModel.find()
          .then((items) => {
               res.status(200).json(items)    
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

// will handle all POST requests to http:localhost:5005/api/create CHECKOUT

router.post('/create', (req, res) => {  
     const {username, name, description, available, image} = req.body;
     console.log(req.body)
     let id = req.session.loggedInUser._id
     ItemModel.create({username: username, name: name, description: description, available: available, image: image, userId:id})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all GET requests to http:localhost:5005/api/items/:itemId
//PS: Don't type :itemId , it's something dynamic, 
router.get('/items/:itemId', (req, res) => {
     ItemModel.findById(req.params.itemId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

// will handle all DELETE requests to http:localhost:5005/api/items/:id
router.delete('/items/:id', (req, res) => {
     ItemModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all PATCH requests to http:localhost:5005/api/items/:id
router.patch('/items/:id', (req, res) => {
     let id = req.params.id
     const {username, name, description, available, image} = req.body;
     ItemModel.findByIdAndUpdate(id, {$set: {username: username, name: name, description: description, available: available, image: image}}, {new: true})
               .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;