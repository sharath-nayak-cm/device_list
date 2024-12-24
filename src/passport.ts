import express from "express";
import User from "./models/User";
import passport from "passport";
import "./passport-config"; // Import the Passport configuration

var router = express.Router();

// Routes

router.post("/register", async (req, res) => {
  console.log("this is  inside Post  /register", req.body);
  const bcrypt = require("bcrypt");
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  console.log("the new user name is ", newUser);
  try {
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(error);
  }
});

module.exports = router;
