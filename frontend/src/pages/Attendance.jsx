import { useState } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';

const Attendance = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [lastMarkedEmployeeId, setLastMarkedEmployeeId] = useState('');

    const handleAttendanceMarked = (employeeId) => {
        setLastMarkedEmployeeId(employeeId);
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="flex flex-col gap-lg">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Mark Attendance</h2>
                    <p className="card-subtitle">Record daily attendance for employees</p>
                </div>
                <div className="card-body">
                    <AttendanceForm onAttendanceMarked={handleAttendanceMarked} />
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Attendance History</h2>
                    <p className="card-subtitle">View attendance records for any employee</p>
                </div>
                <div className="card-body">
                    <AttendanceList
                        refreshTrigger={refreshTrigger}
                        defaultEmployeeId={lastMarkedEmployeeId}
                    />
                </div>
            </div>
        </div>
    );
};

export default Attendance;
