const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { middleware } = require("../middlewares");

const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/sign-up", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.json({ message: "Email already taken / Worng inputs" });
  }
  const user = await User.findOne({ username: body.username });

  if (user) {
    return res.json({
      message: "Email already taken / Worng inputs",
    });
  }

  const newuser = await User.create(body);
  const userId = newuser._id;

  ///--------create new account --------

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: newuser._id }, JWT_SECRET);
  res.json({
    message: "User created succesfully",
    token: token,
  });
});

//update user Info

router.put("/update", middleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.json({
    message: "User updated succesfully",
  });
});

//find all users with this name

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

//sign-in route

router.post("/sign-in", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Wrong inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "error while logging in",
  });
});

module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzI2ZWY0YTI3ODc1Yjc3NDI2MTg3YTUiLCJpYXQiOjE3MzA2MDQ4NzR9.u8ePmbauG4_D7Aoqe7JBGfqvMQ9ot6bXlxEJSSf81Y8
