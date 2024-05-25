const Wishlist = require("../../models/Wishlist");

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

module.exports = { getUserWishlist };
