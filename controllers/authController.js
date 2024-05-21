const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../middleware/generateToken");

const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }

    // check the user exists or not
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Sorry, user already exists with this email and phone number!",
      });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // generate token
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    const token = generateToken(payload);

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
          user: user,
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error!" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: "Please fill all the fields!" });
    }
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Sorry, user does not exists with this phone number!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Sorry, password is incorrect!" });
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const token = generateToken(payload);
    res.status(200).json({
      message: "User logged in successfully!",
      user: user,
      token: token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = { userRegister, userLogin };
