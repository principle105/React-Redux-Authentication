const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    default: ""
  },
  confirmationToken: {
    type: String,
    default: ""
  },
  isVerified: {
    type: Boolean,
    require: true
  }

},{minimize: false});

module.exports = mongoose.model("User", UserSchema);