/**
 * Employee Model
 * 
 * Defines the schema and model for Employee records in the system.
 * Contains all employee information including personal details,
 * position, salary, and department information.
 * 
 * Collection: employees
 */

import mongoose from "mongoose";

/**
 * Employee Schema Definition
 * 
 * @property {String} first_name - Employee's first name (required)
 * @property {String} last_name - Employee's last name (required)
 * @property {String} email - Employee's email address (required, unique)
 * @property {String} position - Job title/position (required)
 * @property {Number} salary - Annual salary amount (required)
 * @property {Date} date_of_joining - Employee's start date (required)
 * @property {String} department - Department name (required)
 * @property {Date} created_at - Record creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate employee emails
  },
  position: {
    type: String,
    required: true, // e.g., "Software Engineer", "Manager", etc.
  },
  salary: {
    type: Number,
    required: true, // Stored as numerical value (e.g., 50000)
  },
  date_of_joining: {
    type: Date,
    required: true, // When the employee joined the company
  },
  department: {
    type: String,
    required: true, // e.g., "IT", "HR", "Finance", etc.
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

// Export Employee model based on employeeSchema
// MongoDB collection name will be 'employees' (lowercase, pluralized)
export default mongoose.model("Employee", employeeSchema);
