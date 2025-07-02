import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GuestsForm from "../components/GuestsForm";

const EditGuests = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [guest, setGuest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/guests/${id}`, {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            setGuest(data);
            setLoading(false);
        })
        .catch((error) => {
            alert("Error fetching guest data: " + error.message);
            navigate("/guests");
        });
    }, [id, navigate]);

    const handleSubmit = (formData, setSubmitting, resetForm, setErrors) => {
        fetch(`${process.env.REACT_APP_API_URL}/guests/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(
                    data.errors ? data.errors.join(" ") : "Guest update failed."
                );
            });
        })
        .then(() => {
            alert("Guest updated successfully!");
            navigate("/guests");
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
        <GuestsForm
            initialValues={{
                name: guest.name,
                email: guest.email,
                phone: guest.phone,
            }}
            onSubmit={handleSubmit}
            title="Edit Guest"
        />
    );
};

export default EditGuests;
