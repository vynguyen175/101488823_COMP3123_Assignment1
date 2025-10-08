/**
 * Database Configuration
 * 
 * Handles MongoDB connection setup using Mongoose ODM.
 * Reads connection string from environment variables for security.
 */

import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connection is established
 * @throws {Error} Logs error if connection fails
 * 
 * Connection string is retrieved from MONGO_URI environment variable
 * which should be defined in the .env file
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log connection error and continue (server will handle subsequent errors)
    console.error("Database connection failed:", error.message);
  }
};
