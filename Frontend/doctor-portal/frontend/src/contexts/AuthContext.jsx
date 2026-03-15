import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("doctor_token");
        if (token) {
            // Decode user info from token (simplistic approach for now)
            // Usually you'd fetch user details from /api/auth/me/
            setUser({ role: "doctor", token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Dummy testing credentials
        if (email === "doctor@healthconnect.com" && password === "password123") {
            const dummyUser = { id: 1, name: "Sameer", role: "doctor" };
            const dummyToken = "dummy-jwt-token-for-testing";
            localStorage.setItem("doctor_token", dummyToken);
            setUser({ ...dummyUser, token: dummyToken });
            return { success: true };
        }

        try {
            const response = await api.post("/auth/login/", { email, password, role: "doctor" });
            const { access, doctor } = response.data;
            localStorage.setItem("doctor_token", access);
            setUser({ ...doctor, token: access });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Login failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("doctor_token");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
