/**
 * User Routes
 * 
 * Defines API endpoints for user authentication operations.
 * Base path: /api/v1/user
 * 
 * Available endpoints:
 * - POST /signup - Register a new user account
 * - POST /login - Authenticate existing user and get JWT token
 */

import express from "express";
import { signup, login } from "../controllers/userController.js";

// Create Express router instance
const router = express.Router();

// ============================
// USER AUTHENTICATION ROUTES
// ============================

/**
 * POST /api/v1/user/signup
 * Register a new user account
 * 
 * Request body:
 * - username: string
 * - email: string
 * - password: string
 */
router.post("/signup", signup);

/**
 * POST /api/v1/user/login
 * Authenticate user and receive JWT token
 * 
 * Request body:
 * - email: string
 * - password: string
 */
router.post("/login", login);

// Export router to be mounted in main server file
export default router;
