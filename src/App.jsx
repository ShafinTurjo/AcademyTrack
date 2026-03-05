import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Courses from "./pages/Courses.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="students" replace />} />
        <Route path="students" element={<Students />} />
        <Route path="courses" element={<Courses />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}