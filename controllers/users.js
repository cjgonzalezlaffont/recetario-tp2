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

async function findUserById(id) {
  return users.findUserById(id);
}


async function updatePasswordFromEmail(email, password) {
  return users.updatePasswordFromEmail(email, password);
}

async function addFavorites(userId, title, ingredients, instructions) {
  return users.addFavorites(userId, title, ingredients, instructions);
}


async function deleteFavorites(userId, recipeId) {
  return users.deleteFavorites(userId, recipeId);
}


module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  updatePasswordFromEmail,
  findUserById,
  addFavorites,
  deleteFavorites
};

