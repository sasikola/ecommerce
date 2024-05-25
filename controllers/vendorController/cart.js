const User = require("../../models/User");


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
  
  module.exports = {getUserCart}