var express = require('express');
var router = express.Router();
const controller = require("../controllers/users");

/* GET users listing. */

router.get("/", async (req, res) => {
  res.json(await controller.getUsers());
});


module.exports = router;
