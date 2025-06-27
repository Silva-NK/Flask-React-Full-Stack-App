import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value });
    };

    const handleRegister = (evt) => {
        evt.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(formData),
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json()
            .then((data) => {
                throw new Error(data.errors.join(", "));
            });
        })
        .then((data) => {
            navigate("/login");
        })
        .catch((err) => setErrors([err.message]));
    };

    return (
        <div>
            <h2>Register</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter E-Mail Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account? <a href="/login">Login here.</a>
            </p>
        </div>
    );
}

export default RegisterPage;