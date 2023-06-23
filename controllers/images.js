const images = require("../data/images");

async function getImage(recipe) {
  const images = await images.getImage(recipe);
  return images;
}

module.exports = { getImage };
