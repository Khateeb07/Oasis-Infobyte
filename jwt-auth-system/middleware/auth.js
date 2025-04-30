const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from Bearer header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
      req.user = await User.findById(decoded.id).select("-password"); // Find user and exclude password
      next();
    } catch (error) {
      console.error("Error with token verification:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
