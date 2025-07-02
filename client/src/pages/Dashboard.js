import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
    const { user, errors, setErrors } = useContext(AuthContext);
    const [eventCount, setEventCount] = useState(0);
    const [guestCount, setGuestCount] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Failed to fetch profile.");
        })
        .then((data) => {
            setEventCount(data.event_count);
            setGuestCount(data.guest_count);
        })
        .catch((err) => setErrors([err.message]));
    }, [setErrors]);

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {errors.length > 0 ? (
                    <div className="error-container">
                        <h2>Error</h2>
                        <ul className="error-list">
                            {errors.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="dashboard-content">
                        <h1 className="welcome-message">Welcome, {user ? user.name : "User"}!</h1>
                        
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h2 className="stat-title">Your Events</h2>
                                <p className="stat-value">{eventCount}</p>
                            </div>
                            
                            <div className="stat-card">
                                <h2 className="stat-title">Your Guests</h2>
                                <p className="stat-value">{guestCount}</p>
                            </div>

                            <div className="stat-card">
                                <h2 className="stat-title">Past Events</h2>
                                <p className="stat-value">{guestCount}</p>
                            </div>

                            <div className="stat-card">
                                <h2 className="stat-title">Upcoming Events</h2>
                                <p className="stat-value">{guestCount}</p>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;