import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/events">Guests</Link></li>
                <li><Link to="/events">Profile</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
