const express = require("express");
const {
  allProducts,
  createProduct,
  deleteProduct,
  updateProductDetails,
} = require("../controllers/vendorController/product");
const { getUserCart } = require("../controllers/vendorController/cart");
const { getUserWishlist } = require("../controllers/vendorController/wishlist");
const { getUserReview } = require("../controllers/vendorController/review");
const router = express.Router();

// product routes
router.get("/allProducts", allProducts);
router.post("/addproduct", createProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProductDetails);

// user cart routes
router.get("/getcart/:userId", getUserCart);

// user wishlist routes
router.get("/getwishlist/:userId", getUserWishlist);

// user review routes
router.get("/getreview/:userId", getUserReview);

module.exports = router;
