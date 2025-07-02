import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventsForm from "../components/EventsForm";

const EditEvents = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                setEvent(data);
            } else {
                alert("Event not found");
                navigate("/events");
            }
            setLoading(false);
        })
        .catch((error) => {
            alert("Error fetching event data");
            navigate("/events");
        });
    }, [id, navigate]);

    const handleSubmit = (values, actions) => {
        const { setSubmitting, setErrors } = actions;

        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            method: "PATCH",
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
                    data.errors ? data.errors.join(" ") : "Event update failed."
                );
            });
        })
        .then(() => {
            alert("Event updated successfully!");
            navigate("/events");
        })
        .catch((error) => {
            setErrors({ api: error.message });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <EventsForm
            initialValues={{
                name: event.name,
                description: event.description,
                venue: event.venue,
                date: event.date,
                time: event.time,
            }}
            onSubmit={handleSubmit}
            title="Edit Event"
        />
    );
};

export default EditEvents;