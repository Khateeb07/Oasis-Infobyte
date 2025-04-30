const express = require("express");
const User = require("../models/User");
const Home = require("../models/Home");
const authMiddleware = require("../middleware/auth");
const authRoutes = require("./auth"); // Import auth routes
const router = express.Router();

// Use authentication routes
router.use("/auth", authRoutes);

// Protected route for fetching user data
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
