const express = require("express");
const checkAdmin = require("../middleware/checkAdmin");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, checkAdmin, (req, res) => {
  res.send("this is the admin route");
});

module.exports = router;
