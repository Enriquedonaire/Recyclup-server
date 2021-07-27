const { Schema, model } = require("mongoose");

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
}

})

// 2. Define your model
let UserModel = model('user', UserSchema)

// 3. Export your Model with 'module.exports'
module.exports = UserModel