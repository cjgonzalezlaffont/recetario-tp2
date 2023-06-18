const users = require("../data/users");

async function getUsers() {
  return users.getUsers();
}

async function addUser(user) {
  return users.addUser(user);
}

module.exports = { getUsers, addUser };
