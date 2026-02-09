const Employee = require('../models/Employee');

// Add Employee
const createEmployee = async (req, res, next) => {
    try {
        const { employeeId, fullName, email, department } = req.body;

        // Check for existing employee by ID
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(409).json({ message: 'Employee ID already exists' });
        }

        // Check for existing employee by Email (optional but good practice)
        const existingEmail = await Employee.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const employee = new Employee({
            employeeId,
            fullName,
            email,
            department
        });

        await employee.save();

        res.status(201).json(employee);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
};

// List Employees
const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        next(err);
    }
};

// Delete Employee
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    deleteEmployee
};
