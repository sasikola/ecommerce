const User = require("../models/User");

// to check admin or not
const checkAdmin = async (req, res, next) => {
  //
  const user = await User.findById(req.user._id);
  if (!user.isAdmin) {
    return res.status(400).json({ isAdmin: false });
  }

  next();
};

module.exports = checkAdmin;
