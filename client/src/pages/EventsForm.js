import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../index.css"

function EventForm() {
    const initialValues = {
        name: "",
        description: "",
        venue: "",
        date: "",
        time: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Event name is required."),
        description: Yup.string()
            .required("Description is required."),
        venue: Yup.string()
            .notRequired(),
        date: Yup.date()
            .required("Date is required."),
        time: Yup.string()
            .matches(
                /^([0-1]\d|2[0-3]):([0-5]\d)$/,
                "Invalid time format. Use HH:MM (24hr)."
            )
            .notRequired(),
    });

    const onSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        fetch(`${process.env.REACT_APP_API_URL}/events`, {
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
                throw new Error(
                    data.errors ? data.errors.join(" ") : "Event creation failed."
                );
            });
        })
        .then((data) => {
            resetForm();
            // I want to add a success display message.
        })
        .catch((error) => {
            console.error("Error creating event: ", error);
            setErrors({api: error.message});
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <div className="events-form-wrapper">
            <div className="form-card">
                <h2 className="form-card__title"> Create New Event </h2>
                <Formik
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="form-group">
                            {errors.api && (
                                <div className="form-card__error">{errors.api}</div>
                            )}
                            <div className="form-field">
                                <label htmlFor="name" className="form-label"> Event Name: </label>
                                <Field 
                                   type="text"
                                   name="name" 
                                   className="form-input"
                                   placeholder="E.g. Anchors Inc. Networking Mixer"
                                />

                                <ErrorMessage 
                                   name="name"
                                   component="div"
                                   className="form-card__error" 
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="description" className="form-label" > Event Description: </label>
                                <Field 
                                   as="textarea"
                                   name="description"
                                   className="form-input"
                                   placeholder="Tell guests what to expect..."
                                />

                                <ErrorMessage
                                   name="description"
                                   component="div"
                                   className="form-card__error"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="venue" className="form-label" > Venue: </label>
                                <Field 
                                   type="text"
                                   name="venue"
                                   className="form-input"
                                   placeholder="Where is it happening?"
                                />
                                <ErrorMessage
                                   name="venue"
                                   component="div"
                                   className="form-card__error"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="date" className="form-label" > Date (YYYY-MM-DD): </label>
                                <Field 
                                   type="date"
                                   name="date"
                                   className="form-input"
                                />
                                <ErrorMessage
                                   name="date"
                                   component="div"
                                   className="form-card__error"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="time" className="form-label" > Time (HH:MM): </label>
                                <Field 
                                   type="time"
                                   name="time"
                                   className="form-input"
                                />
                                <ErrorMessage
                                   name="time"
                                   component="div"
                                   className="error"
                                />
                            </div>

                        <button type="submit" className="form-button form-button--full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="form-button__text">Creating... </span> 
                            ) : (
                                <span className="form-button__text">Create Event</span>)}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
    );
}

export default EventForm;