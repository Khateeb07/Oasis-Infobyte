const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/jwt-auth";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
