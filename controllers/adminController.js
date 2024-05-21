const Product = require("../models/Product");
const User = require("../models/User");

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

// to create new product
const createProduct = async (req, res) => {
  const {
    name,
    brand,
    price,
    category,
    image,
    rating,
    type,
    author,
    description,
    gender,
  } = req.body;
  try {
    // check if the product is already exists or not
    const findProduct = await Product.findOne({ name });
    if (findProduct) {
      return res
        .status(400)
        .json({ error: "Product already exists with the same name!" });
    }
    // create new product

    const product = await new Product({
      name,
      brand,
      price,
      category,
      image,
      rating,
      type,
      author,
      description,
      gender,
    });
    await product.save();
    success = true;
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

// to delete the product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let findProduct = await Product.findById(id);
    if (findProduct) {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Product Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
module.exports = {
  allUsers,
  getSingleUserInfo,
  createProduct,
  deleteProduct,
  allProducts,
};
