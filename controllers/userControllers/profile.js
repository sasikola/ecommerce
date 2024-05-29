const bcrypt = require("bcrypt");
// to get the user profile
const User = require("../../models/User");

const getUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findById(userData);
    console.log(user);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// to update user details
const updateUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findByIdAndUpdate(userData, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");
    res
      .status(200)
      .json({ message: "User details updated successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// to update password
const updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userData = req.user;
    const user = await User.findById(userData);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await User.findByIdAndUpdate(
        userData,
        { password: hashedPassword },
        {
          new: true,
          runValidators: true,
        }
      );
      res
        .status(200)
        .json({ message: "Password updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// to reset Password

const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword, confirmPassword } = req.body; //extract the both passwords from the body

    // find the user by User id
    const user = await User.findOne({ phone });
    // validation
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this number!" });
    }

    // validation
    if (!newPassword) {
      return res.status(400).json({ message: "Please provide New Password!" });
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide Confirm Password!" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Please provide Phone Number!" });
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update the password
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  resetPassword,
};
