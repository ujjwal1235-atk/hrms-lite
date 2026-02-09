import { useState } from 'react';
import { createEmployee } from '../api/employeeApi';

const EmployeeForm = ({ onEmployeeAdded }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await createEmployee({ employeeId, fullName, email, department });
            // Clear form
            setEmployeeId('');
            setFullName('');
            setEmail('');
            setDepartment('');
            setSuccess(true);
            // Refresh list
            if (onEmployeeAdded) onEmployeeAdded();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--error)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--success)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    Employee added successfully!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Employee ID</label>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        className="form-input"
                        disabled={loading}
                        placeholder="e.g., EMP001"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="form-input"
                        disabled={loading}
                        placeholder="e.g., John Doe"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        disabled={loading}
                        placeholder="e.g., john.doe@company.com"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                        className="form-input"
                        disabled={loading}
                        placeholder="e.g., Engineering"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Adding...
                        </>
                    ) : (
                        'Add Employee'
                    )}
                </button>
            </form>
        </>
    );
};

export default EmployeeForm;
