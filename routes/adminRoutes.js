const express = require("express");
const {
  allUsers,
  getSingleUserInfo,
  createProduct,
  deleteProduct,
  allProducts,
  updateProductDetails,
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
router.post("/addproduct", createProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProductDetails);

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
