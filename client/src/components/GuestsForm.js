import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../index.css";

function GuestsForm({ initialValues = {}, onSubmit, title = "Add Guest" }) {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Guest's name is required."),
        email: Yup.string()
            .email("Invalid email format.")
            .required("Guest's email address is required."),
        phone: Yup.string()
            .matches(/^\+?\d{7,15}$/, "Invalid phone number format.")
            .required("Guest's phone number is required."),
    });

    const defaultInitialValues = {
        name: "",
        email: "",
        phone: "",
    };

    const formInitialValues = { ...defaultInitialValues, ...initialValues };

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        onSubmit(values, setSubmitting, resetForm, setErrors);
    };

    return (
        <div className="guest-form-container">
            <div className="form-card">
                <h2 className="form-card__title">{title}</h2>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, resetForm }) => (
                        <Form className="form-group">
                            {errors.api && <div className="form-card__error">{errors.api}</div>}

                            <div className="form-field">
                                <label htmlFor="name" className="form-label"> Guest Name: </label>
                                <Field 
                                   type="text"
                                   name="name"
                                   id="name" 
                                   className="form-input"
                                   placeholder="E.g. Jane Hannah Smith"
                                />
                                <ErrorMessage name="name" component="div" className="form-card__error" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="email" className="form-label"> Guest E-Mail Address: </label>
                                <Field 
                                   type="email"
                                   name="email"
                                   id="email" 
                                   className="form-input"
                                   placeholder="E.g. guest.email@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="form-card__error" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="phone" className="form-label"> Guest Phone Number: </label>
                                <Field 
                                   type="text"
                                   name="phone"
                                   id="phone" 
                                   className="form-input"
                                   placeholder="E.g. +254739573348"
                                />
                                <ErrorMessage name="phone" component="div" className="form-card__error" />
                            </div>

                            <div className="form-button-group">
                                <div className="form-button-group__left">
                                    <button 
                                       type="button"
                                       className="form-button form-button--secondary"
                                       onClick={() => resetForm()}
                                       disabled={isSubmitting}
                                    >
                                        Clear Form
                                    </button>

                                    <button 
                                       type="button"
                                       className="form-button form-button--tertiary"
                                       onClick={() => navigate("/guests")}
                                       disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="form-button-group__right">
                                    <button 
                                       type="submit"
                                       className="form-button form-button--primary"
                                       disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="form-button__text">Adding Guest...</span>
                                        ) : (
                                            <span className="form-button__text">Add Guest</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default GuestsForm;
