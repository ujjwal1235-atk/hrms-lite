import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
    const location = useLocation();

    const navItems = [
        {
            section: 'Main',
            items: [
                { path: '/', icon: '👥', label: 'Employees' },
                { path: '/attendance', icon: '📋', label: 'Attendance' },
            ]
        }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleNavClick = () => {
        if (window.innerWidth <= 1024) {
            onMobileClose();
        }
    };

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">HR</div>
                    <span className="logo-text">HRMS Lite</span>
                </div>
                <button
                    className="sidebar-toggle desktop-toggle"
                    onClick={onToggle}
                    aria-label="Toggle sidebar"
                >
                    {isCollapsed ? '→' : '←'}
                </button>
                <button
                    className="sidebar-toggle mobile-close-btn"
                    onClick={onMobileClose}
                    aria-label="Close sidebar"
                >
                    ✕
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((section, idx) => (
                    <div key={idx} className="nav-section">
                        <div className="nav-section-title">{section.section}</div>
                        {section.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                                onClick={handleNavClick}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
