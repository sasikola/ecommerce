const User = require("../models/User");

// to check admin or not
const checkAdmin = async (req, res, next) => {
  //
  const user = await User.findById(req.user._id);
  if (!user.isAdmin) {
    return res.status(400).json({ error: "Only admin can access this route" });
  }

  next();
};

module.exports = checkAdmin;
