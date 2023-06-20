const express = require("express");
require("dotenv").config();
const app = express();
const KEY_PEXEL = process.env.KEY;
const ID = process.env.IDBUSCADOR;

/* async function getImage(recipe) {
  //const url = `https://api.pexels.com/v1/search?query=${query}`;
  const url = process.env.URL_PEXEL + recipe;
  const headers = {
    Authorization: process.env.AUTHORIZATION_PEXEL,
    Cookie: process.env.COOKIE_PEXEL,
  };
  const resultado = await (await fetch(url, { headers })).json().photos[0].src
    .original;
  if (resultado) {
    return resultado;
  } else {
    return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
  }
   return resultado
    ? !resultado.photos[0].src.large
    : "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"; 
} */

async function getImage(recipe) {
  const url = process.env.URL_PEXEL + recipe;
  const headers = {
    Authorization: process.env.AUTHORIZATION_PEXEL,
    Cookie: process.env.COOKIE_PEXEL,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.original;
    } else {
      return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
  }
}

module.exports = { getImage };
