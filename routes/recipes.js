var express = require('express');
var router = express.Router();
const recipes = require("../controllers/recipes");

/* GET users listing. */

router.get("/", async (req, res) => {
    console.log("hola soy recipes");
    res.json(await recipes.getRecipes(req.query.ingredient));
});


module.exports = router;