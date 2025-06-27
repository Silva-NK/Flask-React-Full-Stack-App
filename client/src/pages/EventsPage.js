import React, { useEffect, useState } from "react";

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

    const handleView = (id) => {
        console.log("View Event", id);
    };

    const handleedit = (id) => {
        console.log("Edit Event", id);
    }

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you wan to delete this evenet?")) return;

        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
            methods: "DELETE",
            credentials: "include", 
        })
        .then((response) => {
            if(!response.ok)  throw new Error("Failed to delete this event");
            setEvents(events.filter((event) => event.id !== id));
        })
        .catch((err) => alert(err.message));
    };

    if (loading) return <p> Loading Events... </p>;
    if (error) return <p style={{color: "red"}}>{error}</p>

    return(
        <div>
            <h2>Events</h2>
        <table>
            <thead>
                <tr>
                    <th> Serial No. </th>
                    <th> Name </th>
                    <th> Location </th>
                    <th> Date </th>
                    <th> Time </th>
                    <th> Guests No. </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {events.length === 0 ? (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                            No events available.
                        </td>
                    </tr>
                ) : (
                    events.map((event, index) => (
                        <tr key={event.id}>
                            <td>{index+1}</td>
                            <td>{event.name}</td>
                            <td>{event.venue}</td>
                            <td>{event.date}</td>
                            <td>{event.time || "N/A"}</td>
                            <td>{event.guests ? event.guests.length : 0}</td>
                            <td>
                                <i></i>
                                <i></i>
                                <i></i>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        </div>
    );
}

export default EventsPage;