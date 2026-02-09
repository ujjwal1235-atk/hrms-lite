const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark Attendance
const markAttendance = async (req, res, next) => {
    try {
        const { employeeId, date, status } = req.body;

        // Validate Employee Existence
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Attempt to create attendance record
        // Mongoose schema handles unique compound index (employeeId + date)
        const attendance = new Attendance({
            employeeId,
            date,
            status
        });

        await attendance.save();

        res.status(201).json(attendance);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error for compound index
            return res.status(409).json({ message: 'Attendance already marked for this date' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
};

// Get Attendance for Employee
const getAttendance = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        // Verify employee exists (optional but good for UX)
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            // We could return 404 here, or just empty array if we strictly follow "List records" 
            // Requirement says: "Verify employee exists". So 404 is appropriate if employee ID is invalid.
            return res.status(404).json({ message: 'Employee not found' });
        }

        const records = await Attendance.find({ employeeId }).sort({ date: -1 });
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    markAttendance,
    getAttendance
};
