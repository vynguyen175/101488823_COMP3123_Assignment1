import Employee from "../models/Employee.js";

// GET ALL EMPLOYEES
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    // Check existing email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ status: false, message: "Employee with this email already exists" });
    }

    // Save uploaded image
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const employee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      profileImageUrl: imagePath,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await employee.save();

    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: employee._id,
      profileImageUrl: employee.profileImageUrl,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);

    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    let imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = {
      ...req.body,
      updated_at: new Date(),
    };

    if (imagePath) {
      updatedData.profileImageUrl = imagePath;
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.eid,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }

    res.status(200).json({
      message: "Employee updated successfully.",
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.eid);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// SEARCH EMPLOYEES
export const searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    const filter = {};

    if (department) filter.department = { $regex: department, $options: "i" };
    if (position) filter.position = { $regex: position, $options: "i" };

    const results = await Employee.find(filter);
    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
