const express = require("express");
const app = express();
const db = require("./db/connection");

const userRouter = require("./routes/userRoutes");
const snippetRouter = require("./routes/snippetRoutes");

app.use("/users", userRouter);
app.use("/snippets", snippetRouter);

module.exports = app;
