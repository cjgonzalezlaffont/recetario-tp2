const images = require("../data/images");

async function getImage(recipe) {
  const result = await images.getImage(recipe);
  return result;
}

module.exports = { getImage };
