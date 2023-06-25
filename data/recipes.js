const express = require("express");
require("dotenv").config();
const app = express();
const conn = require("./connection");
const DATABASE = "recetario";
const RECIPES = "recipes";
const { ObjectId } = require("mongodb");

async function getRecipes(queryIngredients) {
  const url = process.env.URL_NINJA + queryIngredients;
  //console.log(url);
  const headers = {
    "X-RapidAPI-Key": process.env.KEY_NINJA,
    "X-RapidAPI-Host": process.env.HOST_NINJA,
  };
  const resultado = (await fetch(url, { headers })).json();
  return resultado;
}

async function getRecipesByTitle(queryTitle) {
  const url = process.env.URL_NINJA + queryTitle;
  const headers = {
    "X-RapidAPI-Key": process.env.KEY_NINJA,
    "X-RapidAPI-Host": process.env.HOST_NINJA,
  };
  const resultado = (await fetch(url, { headers })).json();
  return resultado;
}

async function getFavorites(userId) {
  const connectiondb = await conn.getConnection();
  const favorites = await connectiondb
    .db(DATABASE)
    .collection(RECIPES)
    .find({ userId: userId })
    .toArray();
  return favorites;
}

async function addFavorite(favorite) {
  const clientMongo = await conn.getConnection();
  console.log("DATA" + favorite);
  const res = await clientMongo
    .db(DATABASE)
    .collection(RECIPES)
    .insertOne(favorite);
  return res;
}

async function deleteFavorite(idFavorite) {
  const clientMongo = await conn.getConnection();
  const res = await clientMongo
    .db(DATABASE)
    .collection(RECIPES)
    .deleteOne({ _id: new ObjectId(idFavorite) });
  console.log(res);
  return res;
}

module.exports = {
  getRecipes,
  getRecipesByTitle,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
