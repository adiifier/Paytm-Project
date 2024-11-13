const express = require("express");
const userrouter = require("./user");
const accountRouter = require("./accounts");

const router = express.Router();

router.use("/user", userrouter);
router.use("/accounts", accountRouter);

module.exports = router;
