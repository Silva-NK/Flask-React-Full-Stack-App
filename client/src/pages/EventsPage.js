import React, { useEffect, useState } from "react";

import "../index.css"

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}/events`, {
            credentials: "include",
        })
        .then((response) => {
            if(response.ok) return response.json();
            throw new Error("Failed to fetch events");
        })
        .then((data) => {
            setEvents(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    // const handleView = (id) => {
    //     console.log("View Event", id);
    // };

    // const handleedit = (id) => {
    //     console.log("Edit Event", id);
    // }

    // const handleDelete = (id) => {
    //     if (!window.confirm("Are you sure you wan to delete this evenet?")) return;

    //     fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
    //         methods: "DELETE",
    //         credentials: "include", 
    //     })
    //     .then((response) => {
    //         if(!response.ok)  throw new Error("Failed to delete this event");
    //         setEvents(events.filter((event) => event.id !== id));
    //     })
    //     .catch((err) => alert(err.message));
    // };

    if (loading) return <p> Loading Events... </p>;
    if (error) return <p style={{color: "red"}}>{error}</p>

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
                                            <span className="guests-badge">{event.guests ? event.guests.length : 0}</span>
                                        </td>
                                        <td className="events-table__td events-table__actions">
                                            <button className="events-table__action-btn" aria-label="Edit event">
                                                <i className='bx  bx-edit-alt'  ></i>
                                            </button>
                                            <button className="events-table__action-btn" aria-label="See all details">
                                                <i className='bx  bx-file-detail'  ></i>
                                            </button>
                                            <button className="events-table__action-btn" aria-label="See guest list">
                                                <i className='bx  bx-group'  ></i>
                                            </button>
                                            <button className="events-table__action-btn events-table__action-btn--delete" aria-label="Delete event">
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