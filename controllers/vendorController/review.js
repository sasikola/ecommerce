const Review = require("../../models/Review");

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

module.exports = { getUserReview };
