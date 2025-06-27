import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import { AuthContext } from "../contexts/AuthContext";

import LoginPage from "../pages/LoginPage";
import EventsPage from "../pages/EventsPage";
import RegisterPage from "../pages/RegisterPage";


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      {isLoggedIn && <NavBar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isLoggedIn && <Route path="/events" element={<EventsPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
