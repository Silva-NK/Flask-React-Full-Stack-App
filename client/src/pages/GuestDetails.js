import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GuestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/guests/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.error || "Failed to fetch guest details.");
        });
      })
      .then((data) => {
        setGuest(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

    if (loading) return <div className="loading-message">Loading guest details...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!guest) return <div className="not-found-message">Guest not found.</div>;

  return (
        <div className="details-container">
            <div className="details-card">
                <h2 className="details-title">Guest Details</h2>
                
                <div className="details-content">
                    <div className="detail-row">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{guest.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{guest.email}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{guest.phone}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Created At:</span>
                        <span className="detail-value">{guest.created_at}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Updated At:</span>
                        <span className="detail-value">{guest.updated_at}</span>
                    </div>
                </div>

                <div className="details-actions">
                    <button 
                        className="details-button details-button--back"
                        onClick={() => navigate("/guests")}
                    >
                        Back to All Guests
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestDetails;