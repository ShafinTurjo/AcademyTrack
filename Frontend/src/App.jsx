import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx";
import Courses from "./pages/Courses.jsx";
import DashboardOverview from "./pages/DashboardOverview.jsx";
import AddComplain from "./pages/AddComplain.jsx";
import ComplainsHistory from "./pages/ComplainsHistory.jsx";
import Advisor from "./pages/Advisor.jsx";
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && <SplashOverlay />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="advisor" element={<Advisor />} />
          <Route path="add-complain" element={<AddComplain />} />
          <Route path="teacher" element={<Courses />} />
          <Route path="attendance" element={<div><h2>Attendance</h2></div>} />
          <Route path="assessments" element={<div><h2>Assessments</h2></div>} />
          <Route path="student-enroll" element={<div><h2>Enroll Courses</h2></div>} />
          <Route path="complains" element={<ComplainsHistory />} />
          <Route path="courses" element={<Courses />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}