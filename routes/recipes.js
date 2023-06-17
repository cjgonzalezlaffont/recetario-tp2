var express = require("express");
var router = express.Router();
const recipes = require("../controllers/recipes");

/* GET users listing. */

/* router.get("/", async (req, res) => {
  console.log("router recipes");
  res.json(await recipes.getRecipes(req.query.ingredient));
}); */

router.get("/:ingredients", async (req, res) => {
  console.log("router recipes ingredientes");
  console.log(req.params.ingredients);
  res.json(await recipes.getRecipes(req.params.ingredients));
});

module.exports = router;
