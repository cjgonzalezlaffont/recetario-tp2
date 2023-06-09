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

async function addUser(user) {
  const clientMongo = await connection.getConnection();
  const res = await clientMongo.db(DATABASE).collection(USERS).insertOne(user);
  return res;
}

module.exports = { getUsers, addUser };
