/**
 * Employee Controller
 * 
 * Handles business logic for employee management operations.
 * Implements full CRUD (Create, Read, Update, Delete) functionality
 * for employee records in the system.
 * 
 * All functions are async and handle errors with try-catch blocks.
 * Proper HTTP status codes are returned for different scenarios.
 */

import Employee from "../models/Employee.js";

// ============================
// GET ALL EMPLOYEES
// ============================

/**
 * Retrieve all employees from the database
 * 
 * Endpoint: GET /api/v1/emp/employees
 * 
 * @async
 * @function getAllEmployees
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON array of all employee records
 * 
 * Success Response (200):
 * [
 *   {
 *     _id: "ObjectId",
 *     first_name: "John",
 *     last_name: "Doe",
 *     email: "john.doe@example.com",
 *     position: "Software Engineer",
 *     salary: 75000,
 *     date_of_joining: "2024-01-15",
 *     department: "IT",
 *     created_at: "2024-10-08T12:00:00.000Z",
 *     updated_at: "2024-10-08T12:00:00.000Z"
 *   },
 *   ...
 * ]
 * 
 * Error Response (500):
 * { message: "Error message" }
 */
export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employee documents from the database
    const employees = await Employee.find();
    
    // Return array of employees
    res.status(200).json(employees);
  } catch (error) {
    // Handle database or server errors
    res.status(500).json({ message: error.message });
  }
};

// ============================
// CREATE NEW EMPLOYEE
// ============================

/**
 * Create a new employee record
 * 
 * Endpoint: POST /api/v1/emp/employees
 * 
 * @async
 * @function createEmployee
 * @param {Object} req - Express request object
 * @param {Object} req.body - Employee data
 * @param {string} req.body.first_name - Employee's first name
 * @param {string} req.body.last_name - Employee's last name
 * @param {string} req.body.email - Employee's email
 * @param {string} req.body.position - Job position
 * @param {number} req.body.salary - Annual salary
 * @param {Date} req.body.date_of_joining - Start date
 * @param {string} req.body.department - Department name
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with employee_id or error message
 * 
 * Success Response (201):
 * {
 *   message: "Employee created successfully.",
 *   employee_id: "ObjectId"
 * }
 * 
 * Error Response (500):
 * { message: "Error message" }
 */
export const createEmployee = async (req, res) => {
  try {
    // Create new employee document with request body data
    // Spread operator (...req.body) copies all fields from request
    const employee = new Employee({
      ...req.body,
      created_at: new Date(), // Set creation timestamp
      updated_at: new Date(), // Set initial update timestamp
    });

    // Save the employee to the database
    await employee.save();
    
    // Return success response with employee ID
    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: employee._id,
    });
  } catch (error) {
    // Handle validation errors, duplicate emails, or server errors
    res.status(500).json({ message: error.message });
  }
};

// ============================
// GET EMPLOYEE BY ID
// ============================

/**
 * Retrieve a specific employee by their ID
 * 
 * Endpoint: GET /api/v1/emp/employees/:eid
 * 
 * @async
 * @function getEmployeeById
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.eid - Employee ID (MongoDB ObjectId)
 * @param {Object} res - Express response object
 * @returns {Object} JSON employee object or error message
 * 
 * Success Response (200):
 * {
 *   _id: "ObjectId",
 *   first_name: "John",
 *   last_name: "Doe",
 *   ...
 * }
 * 
 * Error Responses:
 * - 404: Employee not found
 * - 500: Server error
 */
export const getEmployeeById = async (req, res) => {
  try {
    // Find employee by ID from URL parameter
    const employee = await Employee.findById(req.params.eid);
    
    // Check if employee exists
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    
    // Return employee data
    res.status(200).json(employee);
  } catch (error) {
    // Handle invalid ObjectId format or server errors
    res.status(500).json({ message: error.message });
  }
};

// ============================
// UPDATE EMPLOYEE
// ============================

/**
 * Update an existing employee's information
 * 
 * Endpoint: PUT /api/v1/emp/employees/:eid
 * 
 * @async
 * @function updateEmployee
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.eid - Employee ID (MongoDB ObjectId)
 * @param {Object} req.body - Updated employee data (partial or complete)
 * @param {Object} res - Express response object
 * @returns {Object} JSON success message or error message
 * 
 * Success Response (200):
 * {
 *   message: "Employee details updated successfully."
 * }
 * 
 * Error Responses:
 * - 404: Employee not found
 * - 500: Server error
 */
export const updateEmployee = async (req, res) => {
  try {
    // Find and update employee in one operation
    // { new: true } returns the updated document
    const updated = await Employee.findByIdAndUpdate(
      req.params.eid, // Employee ID from URL
      { ...req.body, updated_at: new Date() }, // Update data + timestamp
      { new: true } // Return updated document
    );
    
    // Check if employee was found and updated
    if (!updated) {
      return res.status(404).json({ message: "Employee not found." });
    }
    
    // Return success message
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (error) {
    // Handle validation errors, invalid ObjectId, or server errors
    res.status(500).json({ message: error.message });
  }
};

// ============================
// DELETE EMPLOYEE
// ============================

/**
 * Delete an employee from the database
 * 
 * Endpoint: DELETE /api/v1/emp/employees?eid=xxx
 * 
 * @async
 * @function deleteEmployee
 * @param {Object} req - Express request object
 * @param {Object} req.query - URL query parameters
 * @param {string} req.query.eid - Employee ID (MongoDB ObjectId)
 * @param {Object} res - Express response object
 * @returns {Object} JSON success message or error message
 * 
 * Success Response (204):
 * {
 *   message: "Employee deleted successfully."
 * }
 * 
 * Error Responses:
 * - 404: Employee not found
 * - 500: Server error
 */
export const deleteEmployee = async (req, res) => {
  try {
    // Extract employee ID from query parameter (?eid=xxx)
    const { eid } = req.query;
    
    // Find and delete employee by ID
    const deleted = await Employee.findByIdAndDelete(eid);
    
    // Check if employee was found and deleted
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found." });
    }
    
    // Return success message with 204 status
    // Note: 204 typically doesn't include a response body
    res.status(204).json({ message: "Employee deleted successfully." });
  } catch (error) {
    // Handle invalid ObjectId or server errors
    res.status(500).json({ message: error.message });
  }
};
