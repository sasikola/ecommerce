const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    type: String,
    author: String,
    description: String,
    gender: String,
    countInStock: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
