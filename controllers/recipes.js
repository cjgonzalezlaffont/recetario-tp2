const recipes = require('../data/recipes');

async function getRecipes(){    
    return recipes.getRecipes();
}

module.exports = {getRecipes};