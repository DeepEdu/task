const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/post");
const uuid = require("uuid");

router.route("/signup").post(async (req, res) => {
  const { name, email } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, email });
    await newUser.save();
    res
      .status(200)
      .json({ userDetails: newUser, message: "Successfully user sign-up" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create Post API
router.route("/posts").post(async (req, res) => {
  const { userId, content } = req.body;
  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let postId = uuid.v1();
    // Create a new post
    const newPost = new Post({ postId, userId, content });
    await newPost.save();
    res.status(200).json({ postId: postId, message: "Successfully created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post API
router.route("/deletepost/:postId").delete(async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  try {
    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await Post.findOneAndDelete({ postId });

    res.status(200).json({ message: "Successful post deletion" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch User's Posts API
router.get("/posts/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all posts by userId
    const userPosts = await Post.find({ userId });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
