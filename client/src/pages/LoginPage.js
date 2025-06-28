import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css"

import { AuthContext } from "../contexts/AuthContext"

function LoginPage(){
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    };

    const handleLogin = (evt) => {
        evt.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: formData.usernameOrEmail,
                password: formData.password,
            }),
        })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error ("Invalid login credentials.");
        })
        .then((data) => {
            login();
            navigate("/events");
        })
        .catch((err) => setError(err.message));
    };

    return(
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-card__title">Login</h2>
                {error && <p className="form-card__error">{error}</p>}
                <form onSubmit={handleLogin} className="form-group">
                    <input 
                       type="text"
                       name="usernameOrEmail"
                       className="form-input"
                       placeholder="Enter Username or Email"
                       value={formData.usernameOrEmail}
                       onChange={handleChange}
                    />
                    <input
                       type="password"
                       name="password"
                       className="form-input"
                       placeholder="Enter Password"
                       value={formData.password}
                       onChange={handleChange}
                    />
                    
                    <button type="submit" className="form-button">Login</button>
                </form>
                
                <p className="form-footer">
                    Don't have an account? <a href="/register" className="form-link">Register here.</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;