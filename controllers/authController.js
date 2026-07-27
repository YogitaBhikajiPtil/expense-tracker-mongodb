const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= GENERATE JWT =================

function generateAccessToken(id, name, isPremiumUser) {
  return jwt.sign(
    {
      userId: id,
      name: name,
      isPremiumUser: isPremiumUser || false
    },
    process.env.JWT_SECRET
  );
}

// ================= SIGNUP =================

const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      totalExpense: 0
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: generateAccessToken(
        user._id,
        user.name,
        user.isPremiumUser
      ),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  signup,
  login
};