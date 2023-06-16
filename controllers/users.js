const users = require("../data/users");

async function getUsers() {
  return users.getUsers();
}

async function addUser(user) {
  return users.addUser(user);
}

async function deleteUser(id) {
  return users.deleteUser(id);
}

async function updateUser(user) {
  return users.updateUser(user);
}

async function updatePasswordFromEmail(email, password) {
  return users.updatePasswordFromEmail(email, password);
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  updatePasswordFromEmail,
};
