const conn = require("./connection");
const DATABASE = "recetario";
const USERS = "users";

async function getUsers() {
  const connectiondb = await conn.getConnection();
  const users = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .find()
    .toArray();
  return users;
}

//JWT?
async function addUser(user) {
  const connectiondb = await conn.getConnection();
  const result = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .insertOne(user);
  console.log(result);
  return result;
}

module.exports = { getUsers, addUser };
