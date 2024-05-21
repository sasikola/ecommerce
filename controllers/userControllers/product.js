const Product = require("../../models/Product");

// to fetch all products
const allProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// to get single product
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.send(product);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// to get products for single category
const signgleCategory = async (req, res) => {
  const { userType } = req.body;
  console.log(userType);
  try {
    const product = await Product.find({ type: userType });
    res.send(product);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// to get products category wise
const allCategory = async (req, res) => {
  const { userType, userCategory } = req.body;
  try {
    if (userCategory == "all") {
      const product = await Product.find({ type: userType });
      res.send(product);
    } else if (userCategory == "pricelowtohigh") {
      const product = await Product.find({ type: userType }).sort({ price: 1 });
      res.send(product);
    } else if (userCategory == "pricehightolow") {
      const product = await Product.find({ type: userType }).sort({
        price: -1,
      });
      res.send(product);
    } else if (userCategory == "highrated") {
      const product = await Product.find({ type: userType }).sort({
        rating: -1,
      });
      res.send(product);
    } else if (userCategory == "lowrated") {
      const product = await Product.find({ type: userType }).sort({
        rating: 1,
      });
      res.send(product);
    } else {
      const product = await Product.find({
        type: userType,
        category: userCategory,
      });
      res.send(product);
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// to search products added search filters on frontend so no need to create separate api for this

const search = async (req, res) => {
  const { key } = req.params;
  try {
    if (key.length > 0) {
      const product = await Product.find({
        $or: [
          { name: { $regex: key, $options: "i" } },
          { type: { $regex: key, $options: "i" } },
          { brand: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { author: { $regex: key, $options: "i" } },
          { description: { $regex: key, $options: "i" } },
          { gender: { $regex: key, $options: "i" } },
        ],
      });
      if (product.length <= 0) {
        res.status(400).send("Product not found");
      } else {
        res.send(product);
      }
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  allProducts,
  singleProduct,
  signgleCategory,
  allCategory,
  search,
};
