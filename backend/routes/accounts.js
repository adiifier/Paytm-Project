const express = require("express");
const { middleware } = require("../middlewares");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", middleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

//------------------

router.post("/transfer", middleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient balance ",
    });
    return;
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid ACccount",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transaction succesful",
  });
});

module.exports = router;
