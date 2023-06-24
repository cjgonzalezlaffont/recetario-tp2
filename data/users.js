const conn = require("./connection");
const DATABASE = "recetario";
const USERS = "users";
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



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

// generador de token, vencimiento cada 4 hs
function generatedToken(user) {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "4h" }
  );
  return token;
}

// Obtener credenciales por email
async function findByCredential(email, password) {

  const connectiondb =await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales invalidas");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales invalidas");
  }

  return user;
}


// obtener un usuario por id
async function findUserById(id){
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
                      .db(DATABASE)
                      .collection(USERS)
                      .find({_id: new ObjectId(id)}) 
                      .toArray();  
  return user;
}


async function addFavorites(userId, title, ingredients, instructions) {
  const connectiondb = await conn.getConnection();

  function generarId() {
    return Math.floor(Math.random() * 100000);
  }
  const newRecipe = {
    //id: generarId(),
    title: title,
    ingredients: ingredients,
    instructions: instructions
  };

  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .updateOne({ _id: new ObjectId(userId) }, { $push: {favoritesRecipes: newRecipe } });
  return user;
}



async function deleteFavorites(userId, recipeId) {
  const connectiondb = await conn.getConnection();

  const result = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { "favoritesRecipes.0": { id: recipeId } } }
    );

  console.log(result);

  if (result.modifiedCount > 0) {
    console.log('Receta eliminada de los favoritos');
  } else {
    console.log('No se encontró la receta en los favoritos');
  }

  return result;
}



module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  updatePasswordFromEmail,
  findByCredential,
  generatedToken,
  findUserById,
  addFavorites,
  deleteFavorites
};

