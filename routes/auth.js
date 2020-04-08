const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../Validation/Validation");

router.post("/register", async (req, res) => {
  // const { error } = Schema.validate(req.body);
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if email exist
  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //check if email exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email or password doesnt match");
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send("Email or password doesnt match");
    }
  }
  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token).send(token);
  res.send("logged in");
});

module.exports = router;
