const { db } = require("./connection");
const { Snippet, User } = require("../models/index");
const seedData = require("./seedData.json");

const seed = async () => {
  // drop the db
  await db.sync({ force: true });

  for (const user of seedData) {
    await Snippet.create({
      id: user.id,
      language: user.language,
      code: user.code,
    });
  }

  console.log("User database info populated!");
};

// export my seed function
// module.exports = seed
seed();
