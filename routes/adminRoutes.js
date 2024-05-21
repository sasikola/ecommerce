const express = require("express");
const checkAdmin = require("../middleware/checkAdmin");
const verifyToken = require("../middleware/verifyToken");
const {
  allUsers,
  getSingleUserInfo,
  createProduct,
  deleteProduct,
  allProducts,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/allUsers", allUsers);
router.get("/singleUser/:userId", getSingleUserInfo);

// product routes
router.get("/allProducts", allProducts);
router.post("/createProduct", createProduct);
router.delete("/deleteProduct/:id", deleteProduct);
module.exports = router;
