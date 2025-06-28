import React from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../index.css";

function RegisterPage() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required."),
        email: Yup.string()
            .email("Invalid email format")
            .required("E-Mail is required."),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters.")
            .required("Password is required")
    });

    const handleRegister = (values, { setSubmitting, setErrors }) => {
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(values),
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(data.errors ? data.errors.join(", "): "Registration failed.");
            });
        })
        .then(() => {
            navigate("/login");
        })
        .catch((err) => setErrors({ general:err.message }))
        .finally(() => setSubmitting(false));
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-card__title">Register</h2>
                <Formik
                  initialValues={{ username: "", email: "", password: ""}}
                  validationSchema={validationSchema}
                  onSubmit={handleRegister}
                >
                    {({isSubmitting, errors}) => (
                        <Form className="form-group">
                            {errors.general && (
                                <div className="form-card__error">{errors.general}</div>
                            )}

                            <Field
                               type="text"
                               name="username"
                               className="form-input"
                               placeholder="Enter username"
                            />
                            <ErrorMessage
                               name="username"
                               component="div"
                               className="form-card__error"
                            />

                            <Field
                               type="email"
                               name="email"
                               className="form-input"
                               placeholder="Enter e-mail address"
                            />
                            <ErrorMessage
                               name="email"
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
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="form-footer">
                    Already have an account? {" "} 
                    <Link to="/login" className="form-link">
                        Login here.
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;