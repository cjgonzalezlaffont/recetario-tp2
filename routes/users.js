var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");
const usersData = require("../data/users");
const auth = require("../middleware/Auth.js");

/* GET users listing. */
router.get("/", auth, async (req, res) => {
  res.json(await controller.getUsers());
});

/*POST de un solo user*/
router.post("/", async (req, res) => {
  const user = req.body;
  const result = await controller.addUser(user);
  res.json(result);
});

router.post("/login", async (req, res) => {
  try {
    const user = await usersData.findByCredential(
      req.body.email,
      req.body.password
    );
    const token = usersData.generatedToken(user);
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
});

/*DELETE de un solo user por ID*/
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const result = await controller.deleteUser(id);
  res.json(result);
});

/*PUT de un solo user por ID*/
router.put("/:id", auth,  async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  user._id = id;
  const result = await controller.updateUser(user);
  res.json(result);
});

router.put("/email/:email", auth, async (req, res) => {
  const email = req.params.email;
  const password = req.body;
  const result = await controller.updatePasswordFromEmail(email, password);
  try {
    res.json(result);
  } catch {
    console.log("/email/:email");
  }
});

module.exports = router;
