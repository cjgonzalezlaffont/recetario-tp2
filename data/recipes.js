const express = require ('express');
const app = express();
//const fetch = require('node-fetch').default;
const url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDtB12vXT4bZzSI7A27bGeS_42UUkgo320&cx=172bc9b10be954c63&q=pollo%20recetas%0A';


async function getRecipes () {
  const {default:fetch} = await import ('node-fetch');
  const response = await fetch(url);
  const recipes = await response.json();
                      
  return recipes;
}

module.exports = {getRecipes};
