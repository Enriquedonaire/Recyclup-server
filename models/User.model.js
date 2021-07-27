const { Schema, model } = require("mongoose");
require('./Items.model')
// 1. Define your schema
let UserSchema = new Schema({
    username: {
      type: String,
    },
    name: {
    type: String,
  },
    email: {
    type: String,
    required: true
  },
    passwordHash: {
    type: String,
    required: true
  },
  image: {
  type: String
},
itemsId: {
  type: Schema.Types.ObjectId,
  ref: 'Items'
  
}

})

// 2. Define your model
let UserModel = model('user', UserSchema)

// 3. Export your Model with 'module.exports'
module.exports = UserModel