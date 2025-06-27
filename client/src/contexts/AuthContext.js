import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const login = () => setisLoggedIn(true);
    const logout = () => setisLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}