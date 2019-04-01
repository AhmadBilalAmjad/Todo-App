const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// Setting Schema with mongoose
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Over riding a built-in mongoose method to send only necessary response
UserSchema.methods.toJSON = function() {
  const user = this;
  // Converting mongoose data to a real object
  const userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

// Adding a instance method
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "secret")
    .toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

// Adding a model method
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "secret");
  } catch (e) {
    // return new Promise((res, rej) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
