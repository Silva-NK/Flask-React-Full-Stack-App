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

    if (loading) return <p className="loading-message">Loading event details...</p>;
    if (errors) return <p className="error-message">{errors}</p>;
    if (!event) return <p className="not-found-message">Event not found.</p>;

    return (
        <div className="details-container">
            <div className="details-card">
                <h2 className="details-title">{event.name}</h2>
                
                <div className="details-content">
                    <div className="detail-row">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">{event.description}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Venue:</span>
                        <span className="detail-value">{event.venue || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{event.date}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{event.time || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Guests Count:</span>
                        <span className="detail-value">{event.guest_count}</span>
                    </div>
                </div>

                <div className="details-actions">
                    <button 
                        className="details-button details-button--back"
                        onClick={() => navigate("/events")}
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
