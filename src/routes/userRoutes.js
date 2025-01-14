const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/index");
userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = userRouter;
