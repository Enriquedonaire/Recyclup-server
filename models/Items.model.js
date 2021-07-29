const { Schema, model } = require("mongoose");
require('./User.model')

const ItemSchema = new Schema({
  username: {
    type: String,
  },
  name: {
    type : String,
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
  userId : { 
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  position : [Number]

});

const Item = model("Item", ItemSchema);

module.exports = Item;
