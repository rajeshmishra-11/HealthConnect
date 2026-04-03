import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import LandingPage from './pages/LandingPage';


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('hc_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('hc_dark_mode', darkMode);
  }, [darkMode]);

  const themeProps = { darkMode, setDarkMode };

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage {...themeProps} />} />
        {/* <Route path="/login" element={<LoginPage {...themeProps} />} />
        <Route path="/register" element={<PatientRegister {...themeProps} />} />
        <Route path="/register/success" element={<RegistrationSuccess {...themeProps} />} />
        <Route path="/about" element={<AboutPage {...themeProps} />} /> */}

        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={
          <ProtectedRoute><PatientDashboard {...themeProps} /></ProtectedRoute>
        } />
        <Route path="/records" element={
          <ProtectedRoute><MyRecords {...themeProps} /></ProtectedRoute>
        } />
        <Route path="/prescriptions" element={
          <ProtectedRoute><MyPrescriptions {...themeProps} /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><PatientProfile {...themeProps} /></ProtectedRoute>
        } /> */}

        {/* Fallback */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
