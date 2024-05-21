const Wishlist = require("../../models/Wishlist");

// to fetch all wishlist items
const fetchWishlist = async (req, res) => {
  try {
    const wishlistData = await Wishlist.find({ user: req.user.id }).populate(
      "productId"
    );
    res.send(wishlistData);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

// add item to wishlist
const addItemToWishlist = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = req.header;
    const findProduct = await Wishlist.findOne({
      $and: [{ productId: _id }, { user: req.user.id }],
    });
    if (findProduct) {
      return res.status(400).json({ message: "Product already in a wishlist" });
    } else {
      const wishlistData = new Wishlist({ user: req.user.id, productId: _id });
      const savedWishlist = await wishlistData.save();
      res.send(savedWishlist);
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// remove item from wishlist

// const removeItemFromWishlist = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const wishlistData = await Wishlist.findOneAndDelete({
//       $and: [{ productId: _id }, { user: req.user.id }],
//     });
//     res.send(wishlistData);
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// };

const removeItemFromWishlist =  async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Wishlist.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }



}

module.exports = {
  fetchWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
};
