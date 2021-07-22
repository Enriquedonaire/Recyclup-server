const express = require('express')            //CHANGE THIS TO ITEM-ROUTES!!
const router = express.Router()

let ItemModel = require('../models/Item.model')

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/items
router.get('/items', (req, res) => {
     ItemModel.find()
          .then((items) => {
               res.status(200).json(items)    //instead of render('someHbs'), since we dont have views here to render
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

// will handle all POST requests to http:localhost:5005/api/create

router.post('/create', (req, res) => {  
    const {name, description, completed} = req.body;
    console.log(req.body)
    ItemModel.create({name: name, description: description, completed: completed})
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
    const {name, description, completed} = req.body;
    ItemModel.findByIdAndUpdate(id, {$set: {name: name, description: description, completed: completed}}, {new: true})
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