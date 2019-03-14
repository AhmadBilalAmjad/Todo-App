const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    minlength: 1,
    required: true,
    trim: true
  },
  password: {
    type: Number,
    minlength: 1,
    required: true
  }
});

module.exports = { User };
