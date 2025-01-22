const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded());

/* 
When a POST request is made to /user with email and password in the body, the password should be salted and hashed before the user is saved in the data store.
Bonus: When a GET request is made to /user, only the user whose correct credentials are provided should be returned. The response must not contain the password (or a hash of the password). This is therefore a protected endpoint and can only be accessed if email and password are provided with the request.
*/

async function authenticate(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.user = user;
  next();
}

userRouter.get("/", authenticate, async (req, res) => {
  const { email } = req.user;

  const users = await User.findAll();

  res.status(200).json({ email });
});

app.post("/user", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword });

  res.status(201).json({ message: "User created successfully" });
});

module.exports = userRouter;
