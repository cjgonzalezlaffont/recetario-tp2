const recipes = require("../data/recipes");
const image = require("../data/images");

async function getRecipes(queryIngredients) {
  const recipesAll = await recipes.getRecipes(queryIngredients);
  const recipePromises = recipesAll.map(async (recipe) => {
    const imagePromise = image.getImage(recipe.title);
    const imageURL = await imagePromise;
    const ingredientes = await recipe.ingredients.split("|");

    return {
      title: recipe.title,
      ingredients: ingredientes,
      instructions: recipe.instructions,
      image: imageURL,
    };
  });
  const recipesFilter = await Promise.all(recipePromises);
  //console.log(recipesFilter);
  return recipesFilter;
}

async function getRecipesByTitle(queryTitle) {
  const recipesAll = await recipes.getRecipes(queryTitle);
  const recipePromises = recipesAll.map(async (recipe) => {
    const imagePromise = await image.getImage(recipe.title);
    const imageURL = await imagePromise;
    return {
      title: recipe.title,
      image: imageURL,
    };
  });
  const titles = await Promise.all(recipePromises);
  //console.log(titles);

  return titles;
}

async function getFavorites(userId) {
  return recipes.getFavorites(userId);
}

async function addFavorite(favorite) {
  console.log("CONTROLLER" + favorite);
  return recipes.addFavorite(favorite);
}

async function deleteFavorite(idFavorite) {
  return recipes.deleteFavorite(idFavorite);
}

async function checkFavoriteRecipeByUserAndName(userId, recipeTitle) {
  return recipes.checkFavoriteRecipeByUserAndName(userId, recipeTitle);
}

module.exports = {
  getRecipes,
  getRecipesByTitle,
  getFavorites,
  addFavorite,
  deleteFavorite,
  checkFavoriteRecipeByUserAndName,
};
