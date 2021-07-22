const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
 
  password: {
    type: String,
    required: true
  },
  email: {
    type: String   //is this just a string?
  },
  status: {
    enum: ["Active", "Pending confirmation"],
    default:  "Pending confirmation"
  }

});

const User = model("User", userSchema);

module.exports = User;
