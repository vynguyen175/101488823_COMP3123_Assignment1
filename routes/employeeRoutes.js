import express from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} from "../controllers/employeeController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// SEARCH
router.get("/employees/search", searchEmployees);

// GET all
router.get("/employees", getAllEmployees);

// GET one
router.get("/employees/:eid", getEmployeeById);

// CREATE (with image)
router.post("/employees", upload.single("profileImage"), createEmployee);

// UPDATE (with image)
router.put("/employees/:eid", upload.single("profileImage"), updateEmployee);

// DELETE
router.delete("/employees/:eid", deleteEmployee);

export default router;
