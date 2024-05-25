const Product = require("../../models/Product");

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

// update product details
const updateProductDetails = async (req, res) => {
  const updateProduct = req.body.productDetails;
  updateProduct.price = parseFloat(updateProduct.price);
  updateProduct.rating = parseFloat(updateProduct.rating);
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    try {
      let update = await Product.findByIdAndUpdate(id, { $set: updateProduct });
      success = true;
      const findType = await Product.find({ type: "book" }).distinct(
        "category"
      );

      res.send({ success, message: "Product updated successfully", findType });
    } catch (error) {
      // return res.status(400).send({ success, error: error })
      return res.status(400).send(error);
    }
  } else {
    return res.status(400).send({ success, error: "Product not found" });
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
        .send({ success: false, message: "Product Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  allProducts,
  updateProductDetails
};
