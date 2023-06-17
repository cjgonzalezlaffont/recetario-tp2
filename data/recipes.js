const express = require("express");
require("dotenv").config();
const app = express();

async function getRecipes(ingredients) {
  const url = process.env.URL_NINJA + ingredients;
  console.log(url);
  const headers = {
    "X-RapidAPI-Key": process.env.KEY_NINJA,
    "X-RapidAPI-Host": process.env.HOST_NINJA,
  };
  const resultado = (await fetch(url, { headers })).json();

  return resultado;
}

module.exports = { getRecipes };
