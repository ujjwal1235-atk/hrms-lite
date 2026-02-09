const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    status: {
        type: String,
        required: true,
        enum: ['Present', 'Absent']
    }
});

// Enforce one attendance record per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
