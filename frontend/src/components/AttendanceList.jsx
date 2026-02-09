import { useState, useEffect } from 'react';
import { getAttendanceByEmployee } from '../api/attendanceApi';

const AttendanceList = ({ refreshTrigger, defaultEmployeeId }) => {
    const [employeeId, setEmployeeId] = useState(defaultEmployeeId || '');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    // Update local state if default changes (e.g. from parent after marking)
    useEffect(() => {
        if (defaultEmployeeId) {
            setEmployeeId(defaultEmployeeId);
            fetchAttendance(defaultEmployeeId);
        }
    }, [defaultEmployeeId, refreshTrigger]);

    const fetchAttendance = async (id) => {
        if (!id) return;
        setLoading(true);
        setSearched(true);
        setError(null);
        try {
            const data = await getAttendanceByEmployee(id);
            setRecords(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch attendance');
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchAttendance(employeeId);
    };

    return (
        <>
            {/* Search Form */}
            <form onSubmit={handleSearch} style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div className="flex gap-sm">
                    <input
                        type="text"
                        placeholder="Enter Employee ID to view attendance"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="form-input"
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn btn-primary">
                        View History
                    </button>
                </div>
            </form>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center" style={{ padding: '3rem' }}>
                    <span className="loading-spinner" style={{ width: '32px', height: '32px' }}></span>
                    <span style={{ marginLeft: '12px', color: 'var(--text-secondary)' }}>Loading records...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--error)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)'
                }}>
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && searched && records.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <div className="empty-state-title">No attendance records found</div>
                    <div className="empty-state-text">No records found for this employee ID</div>
                </div>
            )}

            {/* Records Table */}
            {!loading && !error && records.length > 0 && (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record._id}>
                                    <td><strong>{record.date}</strong></td>
                                    <td>
                                        <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-error'}`}>
                                            {record.status === 'Present' ? '✓ Present' : '✗ Absent'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AttendanceList;
