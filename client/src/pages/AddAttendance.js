import React from "react";
import { useNavigate } from "react-router-dom";
import AttendanceForm from "../components/AttendanceForm";

function AddAttendance() {
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        fetch(`${process.env.REACT_APP_API_URL}/attendances`, {
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
                throw new Error(data.errors ? data.errors.join(" ") : "Attendance creation failed.");
            });
        })
        .then((data) => {
            resetForm();
            alert("Attendance added successfully!");
            navigate(`/attendances/${data.attendance.id}`);
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