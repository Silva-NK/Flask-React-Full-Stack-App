import React from "react";
import { useNavigate } from "react-router-dom";
import GuestsForm from "../components/GuestsForm";

const AddGuests = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, setSubmitting, resetForm, setErrors) => {
        fetch(`${process.env.REACT_APP_API_URL}/guests`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(
                    data.errors ? data.errors.join(" ") : "Guest creation failed."
                );
            });
        })
        .then(() => {
            resetForm();
            alert("Guest added successfully!");
            navigate("/guests")
        })
        .catch((error) => {
            setErrors({ api: error.message });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return <GuestsForm onSubmit={handleSubmit} title="Add New Guest" />;
};

export default AddGuests;
