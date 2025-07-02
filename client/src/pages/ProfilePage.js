import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
    const { user, setErrors } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [eventCount, setEventCount] = useState(0);
    const [guestCount, setGuestCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errors, setLocalErrors] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Failed to fetch profile.");
        })
        .then((data) => {
            setProfile(data.profile);
            setEventCount(data.event_count);
            setGuestCount(data.guest_count);
            setLoading(false);
        })
        .catch((err) => {
            setErrors([err.message]);
            setLocalErrors([err.message]);
            setLoading(false);
        });
    }, [setErrors]);

    if (loading) return <div className="profile-loading">Loading profile...</div>;

    if (errors.length > 0) {
        return (
            <div className="profile-error-container">
                <h2>Error</h2>
                <ul>
                    {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Your Profile</h1>
                
                {profile ? (
                    <div className="profile-content">
                        <div className="profile-section">
                            <h2 className="profile-section-title">Personal Information</h2>
                            <div className="profile-info">
                                <p><span className="info-label">Name:</span> {profile.name}</p>
                                <p><span className="info-label">Username:</span> {profile.username}</p>
                                <p><span className="info-label">Email:</span> {profile.email}</p>
                            </div>
                        </div>
                        
                        <div className="profile-divider"></div>
                        
                        <div className="profile-section">
                            <h2 className="profile-section-title">Account Details</h2>
                            <div className="profile-info">
                                <p><span className="info-label">Account Created:</span> {profile.created_at}</p>
                                <p><span className="info-label">Last Updated:</span> {profile.updated_at || "Never updated"}</p>
                            </div>
                        </div>
                        
                        <div className="profile-divider"></div>
                        
                        <div className="profile-section">
                            <h2 className="profile-section-title">Activity</h2>
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Total Events</span>
                                    <span className="stat-value">{eventCount}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Total Guests</span>
                                    <span className="stat-value">{guestCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="profile-empty">No profile data available.</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;