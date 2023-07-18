const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function auth(req, res, next) {
  try {
    //let token = req.header("Authorization");
    const token = req.headers.authorization?.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    /*     console.log(token);
    console.log(user); */
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
    /*     console.log("AUTH CATCH"); */
  }
}

module.exports = auth;
