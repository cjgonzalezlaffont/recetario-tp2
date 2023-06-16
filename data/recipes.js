const express = require('express');
require('dotenv').config();
const app = express();
//const fetch = require('node-fetch').default;
const KEY = process.env.KEY;
const ID = process.env.IDBUSCADOR;
//const url = `https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${ID}&q=pollo%20recetas%0A`;
//const url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDtB12vXT4bZzSI7A27bGeS_42UUkgo320&cx=172bc9b10be954c63&q=pollo%20recetas%0A";
const parametro1 = "tomato,chiken";

    
//console.log(url);




async function getRecipes() {
  
  //const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${ID}&app_key=${KEY}%0A`
  const query = 'tomatoe';
  const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe';
 
  const response = await fetch(url);
  const recipes = await response.json();
  console.log(recipes);
      
  return recipes.hits.map ((hit) => ({hit : hit.recipe.label}));
}




/* async function getRecipes() {
  const parama = parametro1;
  const url = `https://api.edamam.com/search?q=${parama}&app_id=${ID}&app_key=${KEY}%0A`
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes;
} */





module.exports = { getRecipes };
