/**
 * User Model
 * 
 * Defines the schema and model for User authentication in the system.
 * Users can sign up and log in to access the Employee Management System.
 * 
 * Collection: users
 */

import mongoose from "mongoose";

/**
 * User Schema Definition
 * 
 * @property {String} username - User's display name (required)
 * @property {String} email - User's email address (required, unique)
 * @property {String} password - User's hashed password (required)
 * @property {Date} created_at - Account creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate email addresses
  },
  password: {
    type: String,
    required: true, // Stored as hashed password using bcrypt
  },
  created_at: {
    type: Date,
    default: Date.now, // Auto-set to current timestamp on creation
  },
  updated_at: {
    type: Date,
    default: Date.now, // Auto-set to current timestamp on update
  },
});

// Export User model based on userSchema
// MongoDB collection name will be 'users' (lowercase, pluralized)
export default mongoose.model("User", userSchema);
