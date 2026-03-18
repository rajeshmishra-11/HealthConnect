import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("pharmacy_token");
        if (token) {
            setUser({ role: "pharmacy", token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Dummy testing credentials
        if (email === "pharmacy@healthconnect.com" && password === "password123") {
            const dummyUser = { id: 1, name: "City Medical Store", role: "pharmacy" };
            const dummyToken = "dummy-jwt-token-pharmacy";
            localStorage.setItem("pharmacy_token", dummyToken);
            setUser({ ...dummyUser, token: dummyToken });
            return { success: true };
        }

        try {
            const response = await api.post("/auth/login/", { email, password, role: "pharmacy" });
            const { access, pharmacy } = response.data;
            localStorage.setItem("pharmacy_token", access);
            setUser({ ...pharmacy, token: access });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Login failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("pharmacy_token");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
