const { Schema, model } = require("mongoose");

require('./User.model')

// create user id parameter whi is the user from item _id type:user.schema.objectId, ref: user._id

const ItemSchema = new Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }

});

const Item = model('Item', ItemSchema);

module.exports = Item;
