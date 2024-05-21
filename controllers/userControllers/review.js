const Review = require("../../models/Review");

// to fetch all reviews
const fetchReviews = async (req, res) => {
  const { filterType } = req.body;
  try {
    if (filterType === "all") {
      const reviewData = await Review.find({
        productId: req.params.id,
      }).populate("user", "firstName lastName");
      res.send(reviewData);
    } else if (filterType === "mostrecent") {
      const reviewData = await Review.find({ productId: req.params.id })
        .populate("user", "firstName lastName")
        .sort({ createdAt: -1 });
      res.send(reviewData);
    } else if (filterType === "old") {
      const reviewData = await Review.find({ productId: req.params.id })
        .populate("user", "firstName lastName")
        .sort({ createdAt: 1 });
      res.send(reviewData);
    } else if (filterType === "positivefirst") {
      const reviewData = await Review.find({ productId: req.params.id })
        .populate("user", "firstName lastName")
        .sort({ rating: -1 });
      res.send(reviewData);
    } else if (filterType === "negativefirst") {
      const reviewData = await Review.find({ productId: req.params.id })
        .populate("user", "firstName lastName")
        .sort({ rating: 1 });
      res.send(reviewData);
    } else {
      const reviewData = await Review.find({
        productId: req.params.id,
      }).populate("user", "firstName lastName");
      res.send(reviewData);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
// to post reviews
const addReview = async (req, res) => {
  try {
    const { id, comment, rating } = req.body;
    const user = req.header;
    const findReview = await Review.findOne({
      $and: [{ user: req.user.id }, { productId: id }],
    });
    if (findReview) {
      return res
        .status(400)
        .json({ message: "Already reviewed that product " });
    } else {
      const reviewData = new Review({
        user: req.user.id,
        productId: id,
        comment: comment,
        rating: rating,
      });
      const savedReview = await reviewData.save();
      res.send({ message: "Review added successfully", savedReview });
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    let deletedReview = await Review.deleteOne({
      $and: [{ user: req.user.id }, { _id: id }],
    });
    res.send({
      message: "Review deleted successfully",
      deletedReview: deletedReview,
    });
  } catch (error) {
    res.send({ message: "Something went wrong,Please try again letter" });
  }
};

const editReview = async (req, res) => {
  const { id, comment, rating } = req.body;

  const review = await Review.findById(id);
  try {
    if (review) {
      let updateDetails = await Review.findByIdAndUpdate(id, {
        $set: { rating: rating, comment: comment },
      });
      success = true;
      res
        .status(200)
        .send({
          success,
          message: "Review edited successfully",
          updateDetails: updateDetails,
        });
    } else {
      return res.status(400).send({ success, error: "User Not Found" });
    }
  } catch (error) {
    res.send("Something went wrong");
  }
};

module.exports = { fetchReviews, addReview, deleteReview, editReview };
