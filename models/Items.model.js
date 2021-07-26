const { Schema, model } = require("mongoose");


const ItemSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: {type : String},
  description: {type: String},
  available: {default: true, type: String},
  image: {type: String}
});

const Item = model("Item", ItemSchema);

module.exports = Item;
