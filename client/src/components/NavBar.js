import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [errors, setErrors] = useState("");

    const { logout, username } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);

    const handleLogout = () => {
        fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "DELETE",
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
                <li className={location.pathname.startsWith('/events') ? 'active' : ''}>
                    Events
                    <ul>
                        <li><Link to="/events">All Events</Link></li>
                        <li><Link to="/events/new">Add New Event</Link></li>
                    </ul>
                </li>
                <li className={location.pathname.startsWith('/guests') ? 'active' : ''}>
                    Guests
                    <ul>
                        <li><Link to="/guests">All Guests</Link></li>
                        <li><Link to="/guests/new">Add New Guest</Link></li>
                    </ul>
                </li>
                <li>
                    <i class='bx  bx-user' onClick={toggleAccountMenu}></i>
                    {showAccountMenu && (
                        <div className="account-menu">
                            <p>{username}</p>
                            <Link to="/profile">Profile</Link><br />
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )} 
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;