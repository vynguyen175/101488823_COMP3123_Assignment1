/**
 * Employee Routes
 * 
 * Defines API endpoints for employee management operations.
 * Implements full CRUD (Create, Read, Update, Delete) functionality.
 * Base path: /api/v1/emp
 * 
 * Available endpoints:
 * - GET /employees - Retrieve all employees
 * - POST /employees - Create new employee
 * - GET /employees/:eid - Get specific employee by ID
 * - PUT /employees/:eid - Update existing employee
 * - DELETE /employees?eid=xxx - Delete employee by ID
 */

import express from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

// Create Express router instance
const router = express.Router();

// ============================
// EMPLOYEE CRUD ROUTES
// ============================

/**
 * GET /api/v1/emp/employees
 * Retrieve all employees from the database
 */
router.get("/employees", getAllEmployees);

/**
 * POST /api/v1/emp/employees
 * Create a new employee record
 * 
 * Request body should include all required employee fields
 */
router.post("/employees", createEmployee);

/**
 * GET /api/v1/emp/employees/:eid
 * Retrieve a specific employee by their ID
 * 
 * @param {string} eid - Employee ID (MongoDB ObjectId)
 */
router.get("/employees/:eid", getEmployeeById);

/**
 * PUT /api/v1/emp/employees/:eid
 * Update an existing employee's information
 * 
 * @param {string} eid - Employee ID (MongoDB ObjectId)
 */
router.put("/employees/:eid", updateEmployee);

/**
 * DELETE /api/v1/emp/employees?eid=xxx
 * Delete an employee from the database
 * 
 * @query {string} eid - Employee ID (MongoDB ObjectId)
 */
router.delete("/employees", deleteEmployee);

// Export router to be mounted in main server file
export default router;
