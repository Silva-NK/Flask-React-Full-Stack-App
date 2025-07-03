import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../index.css";

function AttendanceForm({ initialValues = {}, onSubmit, title = "Add Attendance", isEdit = false }) {
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/guests`, {
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setGuests(data))
        .catch(error => console.error("Error fetching guests:", error));

        fetch(`${process.env.REACT_APP_API_URL}/events`, {
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error("Error fetching events:", error));
    }, []);

    const validationSchema = Yup.object({
        guest_id: Yup.string()
            .required("Guest is required."),
        event_id: Yup.string()
            .required("Event is required."),
        rsvp_status: Yup.string()
            .required("RSVP status is required."),
        plus_ones: Yup.number()
            .min(0, "Number of plus ones must be zero or greater."),
    });

    const defaultInitialValues = {
        guest_id: "",
        event_id: "",
        rsvp_status: "Pending",
        plus_ones: 0,
    };

    const formInitialValues = { ...defaultInitialValues, ...initialValues };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-card__title">{title}</h2>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, resetForm, values }) => (
                        <Form className="form-group">
                            {initialValues.id && (
                                <div className="form-field">
                                    <label htmlFor="id" className="form-label">Attendance ID:</label>
                                    <Field
                                        type="text"
                                        name="id"
                                        id="id"
                                        className="form-input"
                                        readOnly
                                    />
                                </div>
                            )}

                           {isEdit ? (
                                <div className="form-field">
                                    <label htmlFor="guest_name" className="form-label">Guest:</label>
                                    <input
                                        type="text"
                                        name="guest_name"
                                        id="guest_name"
                                        className="form-input"
                                        value={initialValues.guest_name}
                                        readOnly
                                    />
                                </div>
                            ) : (
                                <div className="form-field">
                                    <label htmlFor="guest_id" className="form-label">Guest:</label>
                                    <Field as="select" name="guest_id" id="guest_id" className="form-input">
                                        <option value="">Select Guest</option>
                                        {guests.map(guest => (
                                            <option key={guest.id} value={guest.id}>
                                                {guest.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="guest_id" component="div" className="form-card__error" />
                                </div>
                            )}

                            {isEdit ? (
                                <div className="form-field">
                                    <label htmlFor="event_name" className="form-label">Event:</label>
                                    <input
                                        type="text"
                                        name="event_name"
                                        id="event_name"
                                        className="form-input"
                                        value={initialValues.event_name}
                                        readOnly
                                    />
                                </div>
                            ) : (
                                <div className="form-field">
                                    <label htmlFor="event_id" className="form-label">Event:</label>
                                    <Field as="select" name="event_id" id="event_id" className="form-input">
                                        <option value="">Select Event</option>
                                        {events.map(event => (
                                            <option key={event.id} value={event.id}>
                                                {event.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="event_id" component="div" className="form-card__error" />
                                </div>
                            )}


                            <div className="form-field">
                                <label htmlFor="rsvp_status" className="form-label">RSVP Status:</label>
                                <Field as="select" name="rsvp_status" id="rsvp_status" className="form-input">
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Declined">Declined</option>
                                </Field>
                                <ErrorMessage name="rsvp_status" component="div" className="form-card__error" />
                            </div>

                            <div className="form-field">
                                <label htmlFor="plus_ones" className="form-label">Plus Ones:</label>
                                <Field 
                                   type="number"
                                   name="plus_ones"
                                   id="plus_ones"
                                   className="form-input"
                                />
                                <ErrorMessage name="plus_ones" component="div" className="form-card__error" />
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
                                        onClick={() => navigate("/dashboard")}
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
                                        {isSubmitting ? "Submitting..." : "Submit"}
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

export default AttendanceForm;
