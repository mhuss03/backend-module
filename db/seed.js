const { db } = require("./connection");
const { Snippet, User } = require("../models/index");
const seedData = require("./seedData.json");

const seed = async () => {
  // drop the db
  await db.sync({ force: true });

  console.log("User database info populated!");
};

// export my seed function
// module.exports = seed
seed();
