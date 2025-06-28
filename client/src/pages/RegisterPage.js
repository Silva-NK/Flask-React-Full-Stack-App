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
        <div className="form-card">
            <h2 className="form-card__title">Register</h2>
            {errors.length > 0 && (
                <div className="form-card__error">
                    <ul>
                        {errors.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleRegister} className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter E-Mail Address"
                  value={formData.email}
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

                <button type="submit" className="form-button">Register</button>
            </form>

            <p className="form-footer">
                Already have an account? <a href="/login" className="form-link">Login here.</a>
            </p>
        </div>
    );
}

export default RegisterPage;