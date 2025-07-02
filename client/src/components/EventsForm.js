import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../index.css";

function EventsForm({ initialValues = {}, onSubmit, title = "Create Event" }) {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Event name is required."),
        description: Yup.string()
            .required("Event description is required."),
        venue: Yup.string()
            .notRequired(),
        date: Yup.date()
            .required("Event date is required."),
        time: Yup.string()
            .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM (24hr).")
            .notRequired(),
    });

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        onSubmit(values, setSubmitting, resetForm, setErrors);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-card__title">{title}</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, resetForm }) => (
                        <Form className="form-group">
                            {errors.api && <div className="form-card__error">{errors.api}</div>}

                            <div className="form-field">
                                <label htmlFor="name" className="form-label">Event Name:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-input"
                                    placeholder="E.g. Annual Gala Dinner"
                                />
                                <ErrorMessage name="name" component="div" className="form-card__error" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="description" className="form-label">Event Description:</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    className="form-input form-textarea"
                                    placeholder="Tell guests what to expect..."
                                />
                                <ErrorMessage name="description" component="div" className="form-card__error" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="venue" className="form-label">Venue:</label>
                                <Field
                                    type="text"
                                    name="venue"
                                    id="venue"
                                    className="form-input"
                                    placeholder="Where is it happening?"
                                />
                                <ErrorMessage name="venue" component="div" className="form-card__error" />
                            </div>

                            <div className="form-row">
                                <div className="form-field form-field--half">
                                    <label htmlFor="date" className="form-label">Date:</label>
                                    <Field
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="date" component="div" className="form-card__error" />
                                </div>

                                <div className="form-field form-field--half">
                                    <label htmlFor="time" className="form-label">Time (HH:MM):</label>
                                    <Field
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="time" component="div" className="form-card__error" />
                                </div>
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
                                        onClick={() => navigate("/events")}
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
                                            <span className="form-button__text">Saving...</span>
                                        ) : (
                                            <span className="form-button__text">Save Event</span>
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

export default EventsForm;