const express = require("express");
const {
  allUsers,
  getSingleUserInfo,
  allProducts,
  getUserCart,
  deleteUserCartItem,
  getUserWishlist,
  getUserReview,
  deleteUserReview,
  deleteUserWishlistItem,
} = require("../controllers/adminController");

const router = express.Router();

// user routes
router.get("/getusers", allUsers);
router.get("/geteuser/:userId", getSingleUserInfo);

// product routes
router.get("/allProducts", allProducts);

// cart routes
router.get("/getcart/:userId", getUserCart);
router.delete("/usercart/:id", deleteUserCartItem);

// wishlist routes
router.get("/getwishlist/:userId", getUserWishlist);
router.delete("/userwishlist/:id", deleteUserWishlistItem);

// review routes
router.get("/getreview/:userId", getUserReview);
router.delete("/review/:id", deleteUserReview);

module.exports = router;
