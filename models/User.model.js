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
    type: String,
    unique: true
  },

  status: {
    enum: ["Active", "Pending confirmation"],
    default:  "Pending confirmation",
    type: String
  },

  confirmationCode: String

});

const User = model("User", userSchema);

module.exports = User;
