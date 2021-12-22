const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
    validate(vl) {
      if (vl < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(vl) {
      if (!validator.isEmail(vl)) {
        throw new Error("Invalid email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("Just before saveing!");

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("Just before saveing!", user);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
