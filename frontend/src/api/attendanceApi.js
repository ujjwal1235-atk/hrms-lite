import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Mark Attendance
export const markAttendance = async (attendanceData) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
};

// Get Attendance by Employee ID
export const getAttendanceByEmployee = async (employeeId) => {
    const response = await api.get(`/attendance/${employeeId}`);
    return response.data;
};
