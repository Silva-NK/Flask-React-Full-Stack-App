import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import { AuthContext } from "../contexts/AuthContext";

import Dashboard from "../pages/Dashboard"
import LoginPage from "../pages/LoginPage";
import EventsPage from "../pages/EventsPage";
import RegisterPage from "../pages/RegisterPage";
import AddEvents from "../pages/AddEvents";
import EditEvents from "../pages/EditEvents";
import GuestsPage from "../pages/GuestsPage";
import AddGuests from "../pages/AddGuests";
import EditGuests from "../pages/EditGuests";
import AddAttendance from "../pages/AddAttendance";
import EditAttendance from "../pages/EditAttendance";
import ViewAttendance from "../pages/ViewAttendance";


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <div className={isLoggedIn ? "authenticated-layout" : ""}>
        {isLoggedIn && <NavBar />}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        {isLoggedIn && <Route path="/events" element={<EventsPage />} />}
        {isLoggedIn && <Route path="/events/new" element={<AddEvents />} />}
        {isLoggedIn && <Route path="/events/:id/edit" element={<EditEvents />} />}
        {isLoggedIn && <Route path="/guests" element={<GuestsPage />} />}
        {isLoggedIn && <Route path="/guests/new" element={<AddGuests />} />}
        {isLoggedIn && <Route path="/guests/:id/edit" element={<EditGuests />} />}
        {isLoggedIn && <Route path="/attendances/new" element={<AddAttendance />} />}
        {isLoggedIn && <Route path="/attendances/:id/edit" element={<EditAttendance />} />}
        {isLoggedIn && <Route path="/attendances/:id" element={<ViewAttendance />} />}
      </Routes>
      </div>
    </Router>
  );
}

export default App;