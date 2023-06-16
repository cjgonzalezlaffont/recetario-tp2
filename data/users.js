const conn = require("./connection");
const DATABASE = "recetario";
const USERS = "users";
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

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
  user.password = await bcrypt.hash(user.password, 8);
  try {
    const clientMongo = await conn.getConnection();
    const res = await clientMongo
      .db(DATABASE)
      .collection(USERS)
      .insertOne(user);
    return res;
  } catch {
    console.log("data/users/addUserError");
  }
}

async function deleteUser(id) {
  const clientMongo = await conn.getConnection();
  const res = await clientMongo
    .db(DATABASE)
    .collection(USERS)
    .deleteOne({ _id: new ObjectId(id) });
  console.log(res);
  return res;
}

/*UPDATE update de los atributos del user, menos el password
Estas obligado a pasar todo por el user, sino pone los atributos como null*/
async function updateUser(user) {
  const clientMongo = await conn.getConnection();
  const query = { _id: new ObjectId(user._id) };
  const newValues = {
    $set: {
      userName: user.userName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
    },
  };
  const result = await clientMongo
    .db(DATABASE)
    .collection(USERS)
    .updateOne(query, newValues);
  return result;
}

/*UPDATE busca el email y le hace un update al password*/
async function updatePasswordFromEmail(email, password) {
  const clientMongo = await conn.getConnection();
  const passwordEncription = await bcrypt.hash(password.toString(), 8);
  try {
    const newValue = {
      $set: {
        password: passwordEncription,
      },
    };
    const query = { email: email };
    console.log(email);
    const result = await clientMongo
      .db(DATABASE)
      .collection(USERS)
      .findOneAndUpdate(query, newValue);
    return result;
  } catch {
    console.log("password");
  }
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  updatePasswordFromEmail,
};
