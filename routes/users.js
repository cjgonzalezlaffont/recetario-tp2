var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");
const usersData = require("../data/users");
const auth = require("../middleware/Auth.js");


/* GET users listing. */
router.get("/", auth, async (req, res) => {
  res.json(await controller.getUsers());
});

/*POST de un solo user*/
router.post("/", async (req, res) => {
  const user = req.body;
  const result = await controller.addUser(user);
  res.json(result);
});



router.post("/login", async (req, res) => {
  try {
    const user = await usersData.findByCredential(req.body.email, req.body.password);
    const token = usersData.generatedToken(user);
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
});

/*DELETE de un solo user por ID*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await controller.deleteUser(id);
  res.json(result);
});

/*PUT de un solo user por ID*/
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  user._id = id;
  const result = await controller.updateUser(user);
  res.json(result);
});

router.put("/email/:email", async (req, res) => {
  const email = req.params.email;
  const password = req.body;
  const result = await controller.updatePasswordFromEmail(email, password);
  try {
    res.json(result);
  } catch {
    console.log("/email/:email");
  }
});


// get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  res.json(await controller.findUserById(id));
});


// vamos a recibir la receta con un ID e ir a buscarlo a la base como tal? o vamos a manejarla sin objeto
router.put("/add_favorites/:userId", async (req, res) => {
  const userId = req.params.userId;
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  const result = await controller.addFavorites(userId, title, ingredients, instructions);
    res.json(result);
});

router.put("/delete_favorites/:userId/recipes/:recipeId", async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  const result = await controller.deleteFavorites(userId, recipeId);
    res.json(result);
});




module.exports = router;