const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      default: "user",
      enum: ["user", "admin", "vendor"],
    },
    address: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
