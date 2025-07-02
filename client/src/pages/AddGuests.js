import React from "react";
import GuestsForm from "../components/GuestsForm";

const AddGuests = () => {
    const handleSubmit = (formData, setSubmitting, resetForm, setErrors) => {
        fetch(`${process.env.REACT_APP_API_URL}/guests`, {
            method: "POST",
            credentials: "include",
            body: formData,
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
