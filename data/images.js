const express = require("express");
require("dotenv").config();
const app = express();
const KEY_PEXEL = process.env.KEY;
const ID = process.env.IDBUSCADOR;

async function getImage(recipe) {
  //const url = `https://api.pexels.com/v1/search?query=${query}`;
  const url = process.env.URL_PEXEL + recipe;
  console.log(url);
  const headers = {
    Authorization: process.env.AUTHORIZATION_PEXEL,
    Cookie: process.env.COOKIE_PEXEL,
  };

  const resultado = await (await fetch(url, { headers })).json();

  return resultado.photos[0].src.large;
}

module.exports = { getImage };
