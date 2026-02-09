import { useState, useEffect } from 'react';
import { markAttendance } from '../api/attendanceApi';

const AttendanceForm = ({ onAttendanceMarked }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Present');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Set today's date as default
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            await markAttendance({ employeeId, date, status });
            setSuccessMessage('Attendance marked successfully!');
            // Trigger refresh in parent
            if (onAttendanceMarked) onAttendanceMarked(employeeId);

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to mark attendance');
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
            {successMessage && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--success)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    {successMessage}
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
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select"
                        disabled={loading}
                    >
                        <option value="Present">✓ Present</option>
                        <option value="Absent">✗ Absent</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Marking...
                        </>
                    ) : (
                        'Mark Attendance'
                    )}
                </button>
            </form>
        </>
    );
};

export default AttendanceForm;
