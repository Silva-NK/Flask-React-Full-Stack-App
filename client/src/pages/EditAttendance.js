import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AttendanceForm from "../components/AttendanceForm";

function EditAttendance() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
            credentials: "include",
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch attendance details.");
        })
        .then(data => {
            setAttendance(data);
            setLoading(false);
        })
        .catch(err => {
            setErrors(err.message);
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        fetch(`${process.env.REACT_APP_API_URL}/attendances/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(data => {
                throw new Error(data.error || "Failed to update attendance.");
            });
        })
        .then(data => {
            alert("Attendance updated successfully!");
            navigate(`/attendances/${id}`);
        })
        .catch(err => {
            setErrors({ api: err.message });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    if (loading) return <p>Loading attendance...</p>;
    if (errors) return <p style={{ color: "red" }}>{errors}</p>;

    const initialValues = {
        id: attendance.id,
        guest_id: attendance.guest_id,
        guest_name: attendance.guest_name,
        event_id: attendance.event_id,
        event_name: attendance.event_name,
        rsvp_status: attendance.rsvp_status,
        plus_ones: attendance.plus_ones,
    };

    return (
        <AttendanceForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            title="Edit Attendance"
            isEdit={true}
        />
    );
}

export default EditAttendance;