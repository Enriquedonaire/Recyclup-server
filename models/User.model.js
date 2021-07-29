const { Schema, model } = require("mongoose");
require('./Items.model')

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
    ref: 'Items'                   //why ItemSsss?
  }
// status: {
//   enum: ['Pending confirmation', 'Active'],
//   default: 'Pending confirmation',
//   type: String
//  }
})

let UserModel = model('user', UserSchema)


module.exports = UserModel