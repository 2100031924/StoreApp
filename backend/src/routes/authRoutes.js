const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\W).{8,16}$/;
  return regex.test(password);
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || !email || !address || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({
        error: "Name must be between 20 and 60 characters.",
      });
    }

    if (address.length > 400) {
      return res.status(400).json({
        error: "Address cannot exceed 400 characters.",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be 8-16 characters long, include at least 1 uppercase letter and 1 special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      address,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token, role: user.role, message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

module.exports = router;
