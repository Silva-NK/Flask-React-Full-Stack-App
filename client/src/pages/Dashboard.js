import React, { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
    const { user, errors, setErrors } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Failed to fetch profile.");
        })
        .catch((err) => setErrors([err.message]));
    }, [setErrors]);

    return (
        <div className="dashboard">
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
                    <h1 className="welcome-message">Welcome, {user ? user.name: "User"}!</h1>
                    
                    <div className="stats-container">
                        <div className="stat-card">
                            <h2 className="stat-title">Your Events</h2>
                            <p className="stat-value">0</p>
                        </div>
                        
                        <div className="stat-card">
                            <h2 className="stat-title">Your Guests</h2>
                            <p className="stat-value">0</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;