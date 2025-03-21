const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address: {
    type: String,
    required: true,
    maxlength: 400,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["System Administrator", "Normal User", "Store Owner"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
