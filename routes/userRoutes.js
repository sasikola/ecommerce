const express = require("express");
const {
  allProducts,
  singleProduct,
  signgleCategory,
  allCategory,
  search,
} = require("../controllers/userControllers/product");
const {
  addToCart,
  allCartItems,
  deleteCartItem,
} = require("../controllers/userControllers/cart");
const {
  fetchWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
} = require("../controllers/userControllers/wishlist");
const {
  fetchReviews,
  addReview,
  deleteReview,
  editReview,
} = require("../controllers/userControllers/review");

const router = express.Router();

// Product Routes
router.get("/allProducts", allProducts);
router.get("/singleProduct/:id", singleProduct);
router.post("/fetchproduct/type", signgleCategory);
router.post("/fetchproduct/category", allCategory);
router.get("/search/:key", search);

// Cart Routes
router.post("/addcart", addToCart);
router.get("/fetchcart", allCartItems);
router.delete("/deletecart/:id", deleteCartItem);

// Wishlist Routes
router.get("/fetchwishlist", fetchWishlist);
router.post("/addwishlist", addItemToWishlist);
router.delete("/deletewishlist/:id", removeItemFromWishlist);

// review routes
router.post("/fetchreview/:id", fetchReviews);
router.post("/addreview", addReview);
router.delete("/deletereview/:id", deleteReview);
router.put("/editreview", editReview);

module.exports = router;
