import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Failed to fetch event details.");
        })
        .then((data) => {
            setEvent(data);
            setLoading(false);
        })
        .catch((err) => {
            setErrors(err.message);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading event details...</p>;
    if (errors) return <p style={{ color: "red" }}>{errors}</p>;
    if (!event) return <p>Event not found.</p>;

    return (
        <div>
            <h2>{event.name}</h2>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Venue:</strong> {event.venue || "N/A"}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time || "N/A"}</p>
            <p><strong>Guests Count:</strong> {event.guest_count}</p>

            <button onClick={() => navigate("/events")}>Back to Events</button>
        </div>
    );
}

export default EventDetails;
