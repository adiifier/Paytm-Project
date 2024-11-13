const mongoose = require("mongoose");
const express = require("express");
const { number } = require("zod");

mongoose.connect(
  "mongodb+srv://adityayadav2510:TuKyKl2VLcHZdvcg@cluster0.mnbq6.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: String,

  password: String,

  firstName: String,

  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //Reference to user model
    ref: "User",
    required: true,
  },
  balance: Number,
});

const Account = mongoose.model("Account", accountSchema);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
