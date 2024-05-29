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
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  resetPassword,
} = require("../controllers/userControllers/profile");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// user profile routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile/update", verifyToken, updateUserProfile);
router.post("/profile/update/password", verifyToken, updateUserPassword);
router.post("/password/reset", resetPassword);

// Product Routes
router.get("/allProducts", allProducts);
router.get("/singleProduct/:id", singleProduct);
router.post("/fetchproduct/type", signgleCategory);
router.post("/fetchproduct/category", allCategory);
router.get("/search/:key", search);

// Cart Routes
router.post("/addcart", verifyToken, addToCart);
router.get("/fetchcart", verifyToken, allCartItems);
router.delete("/deletecart/:id", verifyToken, deleteCartItem);

// Wishlist Routes
router.get("/fetchwishlist", verifyToken, fetchWishlist);
router.post("/addwishlist", verifyToken, addItemToWishlist);
router.delete("/deletewishlist/:id", verifyToken, removeItemFromWishlist);

// review routes
router.post("/fetchreview/:id", fetchReviews);
router.post("/addreview", verifyToken, addReview);
router.delete("/deletereview/:id", verifyToken, deleteReview);
router.put("/editreview", verifyToken, editReview);

module.exports = router;
