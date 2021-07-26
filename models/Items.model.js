const { Schema, model } = require("mongoose");


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
      type: String,
      default: false
  },
  image: {
    type: String}
});

const Item = model("Item", ItemSchema);

module.exports = Item;
