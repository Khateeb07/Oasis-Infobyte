const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  message: {
    type: String,
    default: "Hello, World!",
  },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
