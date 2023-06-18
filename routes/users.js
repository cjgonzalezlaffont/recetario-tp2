var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");

/* GET users listing. */

router.get("/", async (req, res) => {
  res.json(await controller.getUsers());
});

router.post("/", async (req, res) => {
  const user = req.body;
  console.log(user);
  const result = await controller.addUser(user);
  res.json(result);
});

module.exports = router;
