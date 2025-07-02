import React from "react";
import ReactDOM from "react-dom/client";

import "boxicons/css/boxicons.min.css";

import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";

import App from "./components/App";


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);