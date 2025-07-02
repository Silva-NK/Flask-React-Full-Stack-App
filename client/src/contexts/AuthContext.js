import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
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
            setUser(data.user);
        })
        .catch((err) => {
            setisLoggedIn(false);
            setUser("");
            setErrors([err.message]);
        });
    }, []);

    const login = (user) => {
        setisLoggedIn(true);
        setUser(user);
    }

    const logout = () => {
        setisLoggedIn(false);
        setUser("");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, errors, setErrors }}>
            {children}
        </AuthContext.Provider>
    )
}