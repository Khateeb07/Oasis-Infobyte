const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Home = require("../models/Home");
const router = express.Router();

// Protected route for fetching user data
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});

// Home route (accessible only to authenticated users)
router.get("/home", authMiddleware, async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = new Home();
      await home.save();
    }
    res.json(home);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching home page data", error: error.message });
  }
});

module.exports = router;
