import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/check_session`, {
            credentials: "include",
        })
        .then((response) => {
            if(response.ok) return response.json();
            throw new Error("Not logged in");
        })
        .then((data) => {
            setisLoggedIn(true);
            setUsername(data.username);
        })
        .catch((err) => {
            setisLoggedIn(false);
            setUsername("");
            setErrors([err.message]);
        });
    }, []);

    const login = (username) => {
        setisLoggedIn(true);
        setUsername(username);
    }

    const logout = () => {
        setisLoggedIn(false);
        setUsername("");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout, errors }}>
            {children}
        </AuthContext.Provider>
    )
}