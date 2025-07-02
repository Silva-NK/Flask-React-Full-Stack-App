import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const { logout, user, setErrors } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);

    const handleLogout = () => {
        fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        })
        .then((res) => {
            if(!res.ok) throw new Error("Logout failed on server");
        })
        .catch((err) => {
            setErrors([err.message]);
        })
        .finally(() => {
            logout();
            navigate("/login");
        });
    };

    return (
        <nav>
            <ul>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={ 
                    location.pathname === '/events' || 
                    location.pathname === '/events/new' ? 'active' : ''
                }>
                    Events
                    <ul>
                        <li className={location.pathname === '/events' ? 'active-child' : ''}>
                            <Link to="/events">All Events</Link>
                        </li>
                        <li className={location.pathname === '/events/new' ? 'active-child' : ''}>
                            <Link to="/events/new">Add New Event</Link>
                        </li>
                    </ul>
                </li>
                <li className={ 
                    location.pathname === '/guests' || 
                    location.pathname === '/guests/new' ? 'active' : ''
                }>
                    Guests
                    <ul>
                        <li className={location.pathname === '/guest' ? 'active-child' : ''}>
                            <Link to="/guests">All Guests</Link>
                        </li>
                        <li className={location.pathname === '/guests/new' ? 'active-child' : ''}>
                            <Link to="/guests/new">Add New Guest</Link>
                        </li>
                    </ul>
                </li>
                <li className={ 
                    location.pathname === '/attendances/new' ? 'active' : ''
                }>
                    Attendance
                    <ul>
                        <li className={location.pathname === '/attendances/new' ? 'active-child' : ''}>
                            <Link to="/attendances/new">Add New Attendance</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <i className='bx bx-user' onClick={toggleAccountMenu}></i>
                    {showAccountMenu && (
                        <div className="account-menu">
                            <div className="account-header">
                                <p className="account-email">{user?.email}</p>
                            </div>
                            <div className="account-divider"></div>
                            <Link to="/profile" className="account-item">
                                <i className='bx bx-user-circle'></i> Profile
                            </Link>
                            <button className="account-item" onClick={handleLogout}>
                                <i className='bx bx-log-out'></i> Logout
                            </button>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
