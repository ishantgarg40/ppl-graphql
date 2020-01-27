const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userApi = require("../apis/userApi");

router.post("/", async (req, res) => {
  try {
    let userData = req.body;
    let response = await userApi.authenticateUserOnLogin(userData);
    jwt.sign({ ...response }, process.env.JWT_SECRET, (err, token) => {
      res.json({ authenticate: true, token });
    });
  } catch (err) {
    res.json({ authenticate: false });
  }
});

module.exports = router;
