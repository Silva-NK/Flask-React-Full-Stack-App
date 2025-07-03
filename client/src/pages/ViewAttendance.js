import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAttendance(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleEdit = () => {
    navigate(`/attendances/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this attendance?")) {
      fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            alert("Attendance deleted successfully.");
            navigate("/");
          } else {
            alert("Failed to delete attendance.");
          }
        })
        .catch((err) => alert("Error deleting attendance: " + err.message));
    }
  };

  const handleGoToGuestList = () => {
    if (attendance && attendance.event_id) {
      navigate(`/events/${attendance.event_id}/guests`);
    } else {
      alert("Event ID not found for this attendance.");
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!attendance) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="attendance-details-container">
      <div className="attendance-card">
        <h1 className="attendance-title">Attendance Details</h1>
        <div className="attendance-content">
          <div className="attendance-detail">
            <span className="detail-label">Guest Name:</span>
            <span className="detail-value">{attendance.guest_name}</span>
          </div>
          <div className="attendance-detail">
            <span className="detail-label">Event Name:</span>
            <span className="detail-value">{attendance.event_name}</span>
          </div>
          <div className="attendance-detail">
            <span className="detail-label">RSVP Status:</span>
            <span className={`detail-value rsvp-${attendance.rsvp_status.toLowerCase()}`}>
              {attendance.rsvp_status}
            </span>
          </div>
          <div className="attendance-detail">
            <span className="detail-label">Plus Ones:</span>
            <span className="detail-value">{attendance.plus_ones}</span>
          </div>
        </div>
        <div className="attendance-actions">
          <button 
            className="attendance-button attendance-button--edit"
            onClick={handleEdit}
          >
            <i className='bx bx-edit-alt'></i> Edit Attendance
          </button>
          <button 
            className="attendance-button attendance-button--delete"
            onClick={handleDelete}
          >
            <i className='bx bx-trash'></i> Delete Attendance
          </button>
        </div>
      </div>

      <div className="attendance-navigation">
        <button 
          className="attendance-button attendance-button--guestlist"
          onClick={handleGoToGuestList}
        >
          <i className='bx bx-group'></i> Guest List
        </button>
      </div>
    </div>
  );
};

export default ViewAttendance;