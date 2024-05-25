const express = require("express");
const {
  userRegister,
  userLogin,
  adminLogin,
  vendorRegister,
  vendorLogin,
} = require("../controllers/authController");

const router = express.Router();

// user login
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

// vendor login
router.post("/vendor/register", vendorRegister);
router.post("/vendor/login", vendorLogin);

// admin login
router.post("/admin/login", adminLogin);

module.exports = router;
1;
