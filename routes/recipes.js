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

router.get("/favorites/:userId", async (req, res) => {
  res.json(await recipes.getFavorites(req.params.userId));
});

router.post("/favorites/add", async (req, res) => {
  res.json(
    await recipes.addFavorite({
      title: req.body.title,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      image: req.body.image,
      userId: req.body.userId,
    })
  );
});

router.delete("/favorites/delete/:_Id", async (req, res) => {
  res.json(await recipes.deleteFavorite(req.params._Id));
});

router.get("/favorites/:recipeTitle/user/:userId", async (req, res) => {
  res.json(
    await recipes.checkFavoriteRecipeByUserAndName(
      req.params.userId,
      req.params.recipeTitle
    )
  );
});

module.exports = router;
