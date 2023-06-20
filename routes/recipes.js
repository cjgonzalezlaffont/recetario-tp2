var express = require("express");
var router = express.Router();
const recipes = require("../controllers/recipes");

/* GET users listing. */

/* router.get("/", async (req, res) => {
  console.log("router recipes");
  res.json(await recipes.getRecipes(req.query.ingredient));
}); */

router.get("/:queryIngredients", async (req, res) => {
  //console.log(req.params.queryIngredients);
  res.json(await recipes.getRecipes(req.params.queryIngredients));
});

router.get("/Title/:queryTitle", async (req, res) => {
  //console.log(req.params.queryTitle);
  res.json(await recipes.getRecipesByTitle(req.params.queryTitle));
});

module.exports = router;
