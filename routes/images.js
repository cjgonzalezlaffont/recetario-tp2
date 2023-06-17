var express = require("express");
var router = express.Router();
const images = require("../controllers/images");

/* GET users listing. */

/* router.get("/", async (req, res) => {
  console.log("router recipes");
  //res.json(await recipes.getRecipes(req.query.ingredient))
}); */

router.get("/:recipe", async (req, res) => {
  console.log("router imagenes parametro");
  console.log(req.params.recipe);
  res.json(await images.getImage(req.params.recipe));
});

module.exports = router;
