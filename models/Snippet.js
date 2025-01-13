// import our db, Model, DataTypes
const { db, DataTypes } = require("../db/connection");

// Creating a User child class from the Model parent class
const Snippet = db.define("snippets", {
  id: DataTypes.INTEGER,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

// exports
module.exports = Snippet;
