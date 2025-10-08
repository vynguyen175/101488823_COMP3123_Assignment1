/**
 * User Controller
 * 
 * Handles business logic for user authentication operations.
 * Implements secure user registration and login functionality with:
 * - Password hashing using bcrypt
 * - JWT token generation for authentication
 * - Email uniqueness validation
 * 
 * All functions are async and handle errors with try-catch blocks.
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ============================
// USER SIGNUP CONTROLLER
// ============================

/**
 * Register a new user account
 * 
 * Endpoint: POST /api/v1/user/signup
 * 
 * @async
 * @function signup
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - User's display name
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's plain text password (will be hashed)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user_id or error message
 * 
 * Success Response (201):
 * {
 *   message: "User created successfully.",
 *   user_id: "ObjectId"
 * }
 * 
 * Error Responses:
 * - 400: Email already exists
 * - 500: Server error
 */
export const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Validate that email is not already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password with bcrypt (salt rounds: 10)
    // This ensures passwords are never stored in plain text
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password only
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save user to database
    await newUser.save();

    // Return success response with user ID
    res.status(201).json({
      message: "User created successfully.",
      user_id: newUser._id,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: error.message });
  }
};

// ============================
// USER LOGIN CONTROLLER
// ============================

/**
 * Authenticate user and generate JWT token
 * 
 * Endpoint: POST /api/v1/user/login
 * 
 * @async
 * @function login
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's plain text password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token or error message
 * 
 * Success Response (200):
 * {
 *   message: "Login successful.",
 *   jwt_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * 
 * Error Responses:
 * - 400: Invalid credentials
 * - 500: Server error
 */
export const login = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      // Use generic error message to prevent email enumeration
      return res.status(400).json({ status: false, message: "Invalid username or password" });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Use same generic error message for consistency
      return res.status(400).json({ status: false, message: "Invalid username or password" });
    }

    // Generate JWT token with user ID as payload
    // Token expires in 1 hour for security
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return success response with JWT token
    res.status(200).json({
      message: "Login successful.",
      jwt_token: token, // Client should store this token for authenticated requests
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: error.message });
  }
};
