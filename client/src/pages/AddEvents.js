import React from "react";
import { useNavigate } from "react-router-dom";
import EventsForm from "../components/EventsForm";

const AddEvents = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, actions) => {
        const { setSubmitting, resetForm, setErrors } = actions;

        fetch(`${process.env.REACT_APP_API_URL}/events`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(
                    data.errors ? data.errors.join(" ") : "Event creation failed."
                );
            });
        })
        .then(() => {
            resetForm();
            alert("Event created successfully!");
            navigate("/events")
        })
        .catch((error) => {
            setErrors({ api: error.message });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return <EventsForm onSubmit={handleSubmit} title="Create New Event" />;
};

export default AddEvents;