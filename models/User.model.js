const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: String    //is this just a string?
});

const User = model("User", userSchema);

module.exports = User;
