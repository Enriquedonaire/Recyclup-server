const { Schema, model } = require("mongoose");


const ItemSchema = new Schema({
  user: {
    type: String,
    unique: true
  },
    name: {
      type : String,
    },
    description: {
      type: String
    },
    available: {
      type: String,
      default: true
  },
  image: {
    type: String}
});

const Item = model("Item", ItemSchema);

module.exports = Item;
