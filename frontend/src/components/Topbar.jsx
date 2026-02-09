const Topbar = ({ title, onMenuClick }) => {
    return (
        <div className="topbar">
            <button
                className="icon-button mobile-menu-btn"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                ☰
            </button>
            <h1 className="topbar-title">{title}</h1>
            <div className="topbar-actions">
                <button className="icon-button" aria-label="Notifications">
                    🔔
                </button>
                <button className="icon-button" aria-label="User menu">
                    👤
                </button>
            </div>
        </div>
    );
};

export default Topbar;
