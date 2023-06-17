const images = require("../data/images");

async function getImage(recipe) {
  console.log("router images");
  return images.getImage(recipe);
}

module.exports = { getImage };
