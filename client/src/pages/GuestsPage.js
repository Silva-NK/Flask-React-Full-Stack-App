import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css"

function GuestsPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_API_URL}/guests`, {
            credentials: "include",
        })
        .then((response) => {
            if(response.ok) return response.json();
            throw new Error("Failed to fetch guests.");
        })
        .then((data) => {
            setGuests(data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setErrors(err.message);
            console.error("Error fetching guest: ", err);
        });
    }, []);

    const handleDelete = (id) => {
        if(!window.confirm("Are you sure you want to delete this guest?")) return;

        fetch(`${process.env.REACT_APP_API_URL}/guests/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then((resp) => {
            if(!resp.ok) throw new Error("Failed to delete guest.");
            setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
        })
        .catch((err) => {
            setErrors(err.message);
            console.error("Error deleting guest: ", err);
            alert("Failed to delete guest. Please try again.")
        });
    };

    if (loading) return <p className="loading-message">Loading Guests...</p>;
    if (errors) return <p className="error-message">{errors}</p>;

    return(
        <div className="guests-table-container">
            <h2 className="guests-table__title">Your Guests</h2>
            <div className="guests-table-scroll-container">
                <div className="guests-table__wrapper">
                    <table className="guests-table">
                        <thead className="guests-table__header">
                            <tr>
                                <th className="guests-table__th"> # </th>
                                <th className="guests-table__th"> Full Name </th>
                                <th className="guests-table__th"> E-Mail Address </th>
                                <th className="guests-table__th"> Phone Number </th>
                                <th className="guests-table__th"> Actions </th>
                            </tr>
                        </thead>
                        <tbody className="guests-table__body">
                            {guests.length === 0 ? (
                                <tr className="guests-table__empty-row">
                                    <td colSpan={5} className="guests-table__empty-message">
                                        No guests yet. Add your first guest!
                                    </td>
                                </tr>
                            ) : (
                                guests.map((guest, index) => (
                                    <tr key={guest.id} className="guests-table__row">
                                        <td className="guests-table__td guests-table__serial">{index + 1}</td>
                                        <td className="guests-table__td guests-table__name">{guest.name}</td>
                                        <td className="guests-table__td guests-table__email">
                                            <a href={`mailto:${guest.email}`} className="guests-table__email-link">
                                                {guest.email}
                                            </a>
                                        </td>
                                        <td className="guests-table__td guests-table__phone">
                                            <a href={`tel:${guest.phone}`} className="guests-table__phone-link">
                                                {guest.phone}
                                            </a>
                                        </td>
                                        <td className="guests-table__td guests-table__actions">
                                            <button 
                                               className="guests-table__action-btn"
                                               onClick={() => navigate(`/guests/${guest.id}/edit`)}
                                               title="Edit guest"
                                            >
                                                <i className='bx bx-edit-alt'></i>
                                            </button>
                                            <button
                                               className="guests-table__action-btn"
                                               onClick={() => navigate(`/guests/${guest.id}`)}
                                               title="View details"
                                            >
                                                <i className='bx bx-folder-open'></i>
                                            </button>
                                            <button 
                                               className="guests-table__action-btn guests-table__action-btn--delete"
                                               onClick={() => handleDelete(guest.id)}
                                               title="Delete guest"
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
}

export default GuestsPage;