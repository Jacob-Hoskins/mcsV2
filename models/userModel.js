const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//name, email, password, confirm pass
//takes to page where users can entry business option and choose from worker/owner
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter a username to create an account"],
  },
  email: {
    required: [true, "An account must have an email"],
    type: String,
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Passwords must match"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
