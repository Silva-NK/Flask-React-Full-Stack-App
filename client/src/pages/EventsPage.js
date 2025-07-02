import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css"

function EventsPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}/events`, {
            credentials: "include",
        })
        .then((response) => {
            if(response.ok) return response.json();
            throw new Error("Failed to fetch events.");
        })
        .then((data) => {
            setEvents(data);
            setLoading(false);
        })
        .catch((err) => {
            setErrors(err.message);
            setLoading(false);
        });
    }, []);

    const handleDelete = (id) => {
        if(!window.confirm("Are you sure you want to delete this event?")) return;

        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then((resp) => {
            if(!resp.ok) throw new Error("Failed to delete event.");
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        })
        .catch((err) => {
            setErrors(err.message);
            console.error("Error deleting event: ", err);
            alert("Failed to delete event.Please try again.")
        });
    };

    if (loading) return <p> Loading Events... </p>;
    if (errors) return <p style={{color: "red"}}>{errors}</p>

    return(
        <div className="events-table-container">
            <h2 className="events-table__title">Your Events</h2>
            <div className="events-table-scroll-container">
                <div className="events-table__wrapper">
                    <table className="events-table">
                        <thead className="events-table__header">
                            <tr>
                                <th className="events-table__th"> # </th>
                                <th className="events-table__th"> Name </th>
                                <th className="events-table__th"> Location </th>
                                <th className="events-table__th"> Date </th>
                                <th className="events-table__th"> Time </th>
                                <th className="events-table__th"> Guests No. </th>
                                <th className="events-table__th"> Actions </th>
                            </tr>
                        </thead>
                        <tbody className="events-table__body">
                            {events.length === 0 ? (
                                <tr className="events-table__empty-row">
                                    <td colSpan="7" className="events-table__empty-message">
                                        No events yet. Create your first event!
                                    </td>
                                </tr>
                            ) : (
                                events.map((event, index) => (
                                    <tr key={event.id} className="events-table__row">
                                        <td className="events-table__td events-table__serial">{index+1}</td>
                                        <td className="events-table__td events-table__name">{event.name}</td>
                                        <td className="events-table__td events-table__venue">{event.venue}</td>
                                        <td className="events-table__td events-table__date">{event.date}</td>
                                        <td className="events-table__td events-table__time">{event.time || "N/A"}</td>
                                        <td className="events-table__td events-table__guests">
                                            <span className="guests-badge">{event.guests_count}</span>
                                        </td>
                                        <td className="events-table__td events-table__actions">
                                            <button 
                                               className="events-table__action-btn"
                                               onClick={() => navigate(`/events/${event.id}/edit`)}
                                               aria-label="Edit event"
                                            >
                                                <i className='bx  bx-edit-alt'  ></i>
                                            </button>
                                            <button
                                               className="events-table__action-btn"
                                               onClick={() => navigate(`/events/${event.id}`)}
                                               aria-label="View details"
                                            >
                                                <i className='bx  bx-file-detail'  ></i>
                                            </button>
                                            <button 
                                               className="events-table__action-btn"
                                               onClick={() => navigate(`/events/${event.id}/guests`)}
                                               aria-label="View guest list"
                                            >
                                                <i className='bx  bx-group'  ></i>
                                            </button>
                                            <button 
                                               className="events-table__action-btn events-table__action-btn--delete"
                                               onClick={() => handleDelete(event.id)}
                                               aria-label="Delete event"
                                            >
                                                <i className='bx  bx-trash'  ></i>
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
}

export default EventsPage;