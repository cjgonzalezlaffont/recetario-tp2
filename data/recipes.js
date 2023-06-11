const express = require ('express');
const app = express();
//const fetch = require('node-fetch').default;
const ID = process.env.IDBUSCADOR;
const KEY = process.env.KEY;
const url = `https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${ID}&q=pollo%20recetas%0A`;


async function getRecipes () {
  const {default:fetch} = await import ('node-fetch');
  const response = await fetch(url);
  const recipes = await response.json();
                      
  return recipes;
}

module.exports = {getRecipes};
