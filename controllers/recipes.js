const recipes = require("../data/recipes");
const image = require("../data/images");

async function getRecipes(queryIngredients) {
  const recipesAll = await recipes.getRecipes(queryIngredients);
  const recipePromises = recipesAll.map(async (recipe) => {
    const imagePromise = image.getImage(recipe.title);
    const imageURL = await imagePromise;
    return {
      title: recipe.title,
      ingredients: recipe.ingredients,
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

module.exports = { getRecipes, getRecipesByTitle };
