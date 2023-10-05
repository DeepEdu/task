const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/post");

router.route("/signup").post(async (req, res) => {
  const { name, email } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, email });
    await newUser.save();
    res
      .status(200)
      .json({ userDetails: newUser, message: "Successfully created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
