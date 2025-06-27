import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Login</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                  type="text"
                  name="usernameOrEmail"
                  placeholder="Enter Username or Email"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                />
                <input 
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account? <a href="/register">Register here.</a>
            </p>
        </div>
    );
}

export default LoginPage;