import { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';

const EmployeeList = ({ refreshTrigger }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await getEmployees();
            setEmployees(data);
            setError(null);
        } catch (err) {
            setError('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await deleteEmployee(id);
            fetchEmployees(); // Refresh list after delete
        } catch (err) {
            alert('Failed to delete employee');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ padding: '3rem' }}>
                <span className="loading-spinner" style={{ width: '32px', height: '32px' }}></span>
                <span style={{ marginLeft: '12px', color: 'var(--text-secondary)' }}>Loading employees...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: '12px 16px',
                backgroundColor: 'var(--error)',
                color: 'white',
                borderRadius: 'var(--radius-md)'
            }}>
                {error}
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <div className="empty-state-title">No employees yet</div>
                <div className="empty-state-text">Add your first employee using the form above</div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td><strong>{emp.employeeId}</strong></td>
                            <td>{emp.fullName}</td>
                            <td>{emp.email}</td>
                            <td>
                                <span className="badge badge-neutral">{emp.department}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button
                                    onClick={() => handleDelete(emp._id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
