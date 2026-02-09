import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const Employees = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleEmployeeAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="flex flex-col gap-lg">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Add New Employee</h2>
                    <p className="card-subtitle">Register a new employee in the system</p>
                </div>
                <div className="card-body">
                    <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Employee List</h2>
                    <p className="card-subtitle">View and manage all registered employees</p>
                </div>
                <div className="card-body">
                    <EmployeeList refreshTrigger={refreshTrigger} />
                </div>
            </div>
        </div>
    );
};

export default Employees;
