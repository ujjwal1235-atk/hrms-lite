import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    // Get page title based on route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Employee Management';
            case '/attendance':
                return 'Attendance Management';
            default:
                return 'HRMS Lite';
        }
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    return (
        <div className="app-container">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
                isMobileOpen={isMobileOpen}
                onMobileClose={() => setIsMobileOpen(false)}
            />
            {isMobileOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
            <div className="main-wrapper">
                <Topbar
                    title={getPageTitle()}
                    onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
                />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
