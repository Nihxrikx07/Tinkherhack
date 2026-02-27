const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  expiry: String,
  hotel: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Food", foodSchema);