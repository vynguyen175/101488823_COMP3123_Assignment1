import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user_id: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ status: false, message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful.",
      jwt_token: token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
