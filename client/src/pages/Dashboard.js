import React, { useEffect, useState } from "react";

function Dashboard() {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Failed to fetch profile.");
        })
        .then((data) => setUsername(data.username))
        .catch((err) => setErrors([err.message]));
    }, []);

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