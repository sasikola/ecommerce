const mongoose = require("mongoose");
const { Schema } = mongoose;
const WishlistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
