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
      type: Boolean,
      default: true
  },
  image: {
    type: String}
});

const Item = model("Item", ItemSchema);

module.exports = Item;
