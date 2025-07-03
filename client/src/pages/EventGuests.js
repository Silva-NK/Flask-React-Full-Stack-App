import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function EventGuests() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [refreshKey, setRefreshKey] = useState(0);
    const [eventName, setEventName] = useState("");
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (location.state && location.state.refresh) {
            setRefreshKey(oldKey => oldKey + 1);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchEventAndGuests = () => {
            fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            credentials: "include",
            })
            .then(eventRes => {
            if (!eventRes.ok) throw new Error("Failed to fetch event details.");
            return eventRes.json();
            })
            .then(eventData => {
            setEventName(eventData.name);

            return fetch(`${process.env.REACT_APP_API_URL}/events/${id}/guests?include_rsvp=true`, {
                credentials: "include",
            });
            })
            .then(guestsRes => {
            if (!guestsRes.ok) throw new Error("Failed to fetch event guests.");
            return guestsRes.json();
            })
            .then(guestsData => {
            setGuests(guestsData);
            setLoading(false);
            })
            .catch(err => {
            setErrors(err.message);
            setLoading(false);
            });
        };

        fetchEventAndGuests();
    }, [id, refreshKey]);


    const handleEditAttendance = (attendanceId) => {
        navigate(`/attendances/${attendanceId}/edit`);
    };

    const handleViewAttendance = (attendanceId) => {
        navigate(`/attendances/${attendanceId}`);
    };

    const handleDeleteAttendance = (attendanceId) => {
        if (!window.confirm("Are you sure you want to delete this attendance?")) return;

        fetch(`${process.env.REACT_APP_API_URL}/attendances/${attendanceId}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to delete attendance.");
            setGuests((prev) => prev.filter((guest) => guest.attendance_id !== attendanceId));
        })
        .catch((err) => alert(err.message));
    };

    const getRsvpStatusClass = (status) => {
        switch(status?.toLowerCase()) {
            case 'confirmed':
                return 'rsvp-status--confirmed';
            case 'declined':
                return 'rsvp-status--declined';
            default:
                return 'rsvp-status--pending';
        }
    };

    if (loading) return <p>Loading guests...</p>;
    if (errors) return <p style={{color:"red"}}>{errors}</p>;

    return (
        <div className="event-guests-container">
            <h2 className="event-guests__title">Guest List for {eventName}</h2>
            <div className="event-guests-scroll-container">
                <div className="event-guests__wrapper">
                    <table className="event-guests-table">
                        <thead className="event-guests__header">
                            <tr>
                                <th className="event-guests__th">#</th>
                                <th className="event-guests__th">Guest Name</th>
                                <th className="event-guests__th">Email</th>
                                <th className="event-guests__th">Phone</th>
                                <th className="event-guests__th">RSVP Status</th>
                                <th className="event-guests__th">Plus Ones</th>
                                <th className="event-guests__th">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="event-guests__body">
                            {guests.length === 0 ? (
                                <tr className="event-guests__empty-row">
                                    <td colSpan={7} className="event-guests__empty-message">
                                        No guests for this event yet.
                                    </td>
                                </tr>
                            ) : (
                                guests.map((guest, index) => (
                                    <tr key={guest.id} className="event-guests__row">
                                        <td className="event-guests__td event-guests__serial">{index + 1}</td>
                                        <td className="event-guests__td event-guests__name">{guest.name}</td>
                                        <td className="event-guests__td event-guests__email">
                                            <a href={`mailto:${guest.email}`} className="guests-table__email-link">
                                                {guest.email}
                                            </a>
                                        </td>
                                        <td className="event-guests__td event-guests__phone">
                                            <a href={`tel:${guest.phone}`} className="guests-table__phone-link">
                                                {guest.phone}
                                            </a>
                                        </td>
                                        <td className="event-guests__td">
                                            <span className={`rsvp-status ${getRsvpStatusClass(guest.rsvp_status)}`}>
                                                {guest.rsvp_status || "Pending"}
                                            </span>
                                        </td>
                                        <td className="event-guests__td">{guest.plus_ones || 0}</td>
                                        <td className="event-guests__td event-guests__actions">
                                            <button 
                                                className="event-guests__action-btn"
                                                onClick={() => handleEditAttendance(guest.attendance_id)}
                                                title="Edit Attendance"
                                            >
                                                <i className='bx bx-edit-alt'></i>
                                            </button>
                                            <button 
                                                className="event-guests__action-btn"
                                                onClick={() => handleViewAttendance(guest.attendance_id)}
                                                title="View Attendance"
                                            >
                                                <i className='bx bx-folder-open'></i>
                                            </button>
                                            <button 
                                                className="event-guests__action-btn event-guests__action-btn--delete"
                                                onClick={() => handleDeleteAttendance(guest.attendance_id)}
                                                title="Delete Attendance"
                                            >
                                                <i className='bx bx-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventGuests;
