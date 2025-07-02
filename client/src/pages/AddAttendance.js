import React from "react";
import AttendanceForm from "../components/AttendanceForm";

const AddAttendance = () => {
    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        fetch(`${process.env.REACT_APP_API_URL}/attendances`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(data.errors ? data.errors.join(" ") : "Attendance creation failed.");
            });
        })
        .then(() => {
            resetForm();
            alert("Attendance added successfully!");
        })
        .catch((error) => {
            setErrors({ api: error.message });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return <AttendanceForm onSubmit={handleSubmit} title="Add New Attendance" />;
};

export default AddAttendance;