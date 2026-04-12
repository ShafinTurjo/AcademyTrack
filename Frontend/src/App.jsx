import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx";
import Courses from "./pages/Courses.jsx";
<<<<<<< Updated upstream
=======
import DashboardOverview from "./pages/DashboardOverview.jsx";
import AddComplain from "./pages/AddComplain.jsx";
import ComplainsHistory from "./pages/ComplainsHistory.jsx";
>>>>>>> Stashed changes

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200); // 2.2s
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && <SplashOverlay />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
<<<<<<< Updated upstream
          <Route index element={<Navigate to="students" replace />} />
=======
          <Route index element={<Navigate to="overview" replace />} />

          {/* Admin */}
          <Route path="overview" element={<DashboardOverview />} />
>>>>>>> Stashed changes
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="add-complain" element={<AddComplain />} />

          {/* Teacher */}
          <Route path="teacher" element={<Courses />} />
          <Route path="attendance" element={<div><h2>Attendance</h2></div>} />
          <Route path="assessments" element={<div><h2>Assessments</h2></div>} />

          {/* Student */}
          <Route path="student-enroll" element={<div><h2>Enroll Courses</h2></div>} />

          {/* Advisor */}
          <Route path="complains" element={<ComplainsHistory />} />

          {/* Shared */}
          <Route path="courses" element={<Courses />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}