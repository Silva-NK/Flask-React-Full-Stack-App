import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../index.css";

import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        usernameOrEmail: Yup.string()
            .required("Username or Email is required."),
        password: Yup.string()
            .required("Password is required.")
    });

    const handleLogin = (values, { setSubmitting, setErrors }) => {
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: values.usernameOrEmail,
            password: values.password,
            }),
        })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Invalid login credentials.");
            })
        .then((data) => {
            login(data.user); // pass full user
            navigate("/dashboard");
        })
        .catch((err) => {
            setErrors({ general: err.message });
            })
        .finally(() => setSubmitting(false));
    };


    return(
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-card__title">Login</h2>
                <Formik
                initialValues={{usernameOrEmail: "", password: ""}}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="form-group">
                            {errors.general && (
                                <div className="form-card__error">{errors.general}</div>
                            )}

                            <Field
                                type="text"
                                name="usernameOrEmail"
                                className="form-input"
                                placeholder="Enter username or e-mail"
                            />
                            <ErrorMessage
                                name="usernameOrEmail"
                                component="div"
                                className="form-card__error"
                            />

                            <Field
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="form-card__error"
                            />

                            <button type="submit" className="form-button" disabled={isSubmitting}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
    
                <p className="form-footer">
                    Don't have an account?{" "}
                    <Link to="/register" className="form-link">
                        Register here.
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;