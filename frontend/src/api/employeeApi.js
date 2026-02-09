import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Get all employees
export const getEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
};

// Create new employee
export const createEmployee = async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};
