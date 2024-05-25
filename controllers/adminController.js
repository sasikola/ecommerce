const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");

// to get all user information
const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password, -isAdmin");
    res
      .status(200)
      .json({ message: "Users fetched successfully", users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// to get single user information
const getSingleUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const findUser = await User.findById(userId);
    if (findUser) {
      console.log(findUser);
      res.send({ message: "User found!", user: findUser });
    } else {
      res.status(400).send("User Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// to get all products
const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "Products fetched successfully", products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};


// get user cart info
const getUserCart = async (req, res) => {
  const { userId } = req.params;
  const findUser = await User.findById(userId);
  if (findUser) {
    try {
      const findUserCart = await Cart.find({ user: userId })
        .populate("productId", "name price image rating type")
        .populate("user", "name email");
      res.send(findUserCart);
    } catch (error) {
      res.send("Something went wrong");
    }
  } else {
    res.status(400).send("User Not Found");
  }
};

// get user wishlist info
const getUserWishlist = async (req, res) => {
  const { userId } = req.params;
  const findUser = await User.findById(userId);
  if (findUser) {
    try {
      const findUserWishlist = await Wishlist.find({ user: userId }).populate(
        "productId"
      );
      res.send(findUserWishlist);
    } catch (error) {
      res.send("Something went wrong");
    }
  } else {
    res.status(400).send("User Not Found");
  }
};

// get user order info
const getUserReview = async (req, res) => {
  const { userId } = req.params;
  const findUser = await User.findById(userId);
  if (findUser) {
    try {
      const findUserReview = await Review.find({ user: userId })
        .populate("productId", "name price image rating type")
        .populate("user", "firstName lastName");
      res.send(findUserReview);
    } catch (error) {
      res.send("Something went wrong");
    }
  } else {
    res.status(400).send("User Not Found");
  }
};

// delete user review
const deleteUserReview = async (req, res) => {
  const { id } = req.params;
  try {
    let deleteReview = await Review.findByIdAndDelete(id);
    res.send({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong,Please try again letter", error });
  }
};

// delete user cart item
const deleteUserCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    let deleteCart = await Cart.findByIdAndDelete(id);
    success = true;
    res.send({
      success,
      message: "Review deleted successfully",
      deleteCart: deleteCart,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong,Please try again letter1" });
  }
};

// delete user wishlist item
const deleteUserWishlistItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let deleteCart = await Wishlist.findByIdAndDelete(id);
    success = true;
    res.send({ success, message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Something went wrong,Please try again letter" });
  }
};

module.exports = {
  allUsers,
  getSingleUserInfo,
  getUserCart,
  deleteUserCartItem,
  getUserWishlist,
  getUserReview,
  deleteUserReview,
  deleteUserWishlistItem,
  allProducts
};
