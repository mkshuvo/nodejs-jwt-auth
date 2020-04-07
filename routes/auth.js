const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.post("/register", async (req, res) => {
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/loginb", (req, res) => {
  res.send("register");
});

module.exports = router;
