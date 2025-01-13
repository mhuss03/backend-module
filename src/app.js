const express = require("express");
const app = express();
const db = require("../db/connection");

const userRouter = require("./routes/user");

app.use("/users", userRouter);

module.exports = app;
