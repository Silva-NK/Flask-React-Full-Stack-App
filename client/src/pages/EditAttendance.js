import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AttendanceForm from "../components/AttendanceForm";

const EditAttendance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            setAttendance(data);
            setLoading(false);
        })
        .catch((error) => {
            alert("Error fetching attendance data: " + error.message);
            navigate("/attendances");
        });
    }, [id, navigate]);

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
        })
        .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((data) => {
                throw new Error(data.errors ? data.errors.join(" ") : "Attendance update failed.");
            });
        })
        .then(() => {
            alert("Attendance updated successfully!");
            navigate("/attendances");
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
        <AttendanceForm
            initialValues={{
                guest_id: attendance.guest_id,
                event_id: attendance.event_id,
                rsvp_status: attendance.rsvp_status,
                plus_ones: attendance.plus_ones,
            }}
            onSubmit={handleSubmit}
            title="Edit Attendance"
        />
    );
};

export default EditAttendance;