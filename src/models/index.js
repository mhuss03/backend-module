const Snippet = require("./Snippet");
const User = require("./User");

User.hasMany(Snippet);
Snippet.belongsTo(User);

module.exports = {
  Snippet,
  User,
};
