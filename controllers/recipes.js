const recipes = require('../data/recipes');

async function getRecipes(ingredient){    
    return recipes.getRecipes(ingredient);
}

module.exports = {getRecipes};