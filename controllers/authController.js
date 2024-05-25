const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../middleware/generateToken");

// this is User Register
const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password, userType } = req.body;
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
      userType: "user",
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
      success: true,
      userDetails: {
        phone,
        password,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// this is vendor register
const vendorRegister = async (req, res) => {
  try {
    const { name, email, phone, password, userType } = req.body;
    if (!name || !email || !password || !phone) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    let existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return res.json({ message: "User exists with this Phone Number" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      userType: "vendor",
    });
    const response = await user.save();
    const payload = {
      _id: response.id,
    };
    const token = generateToken(payload);
    res.json({
      message: "Vendor registered successfully!",
      response: response,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// this is vendor Login
const vendorLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!password || !phone) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Vendor not found with this Phone number!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // to generate token
    const payload = {
      _id: user.id,
    };
    const token = generateToken(payload);
    // password = undefined;
    res.status(200).json({
      message: "Vendor Logged in successfully!",
      token: token,
      userDetails: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

const adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user || user.userType !== "admin")
      return res.status(400).json({ message: "Admin not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    // to generate token
    const payload = {
      _id: user.id,
    };
    const token = generateToken(payload);
    res.status(200).json({
      message: "Admin Logged in successfully!",
      token: token,
      userDetails: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  vendorRegister,
  vendorLogin,
  adminLogin,
};
