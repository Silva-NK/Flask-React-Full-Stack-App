import React, { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
    const { username, errors, setErrors } = useContext(AuthContext);

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
                <h1 className="welcome-message">Welcome, {username}...</h1>
            )}
        </div>
    );
}

export default Dashboard;