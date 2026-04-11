import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx";
import Attendance from "./pages/Attendance.jsx"; 
import AddComplain from "./pages/AddComplain.jsx";
import AdvisorComplains from "./pages/AdvisorComplains.jsx";
import DashboardOverview from "./pages/DashboardOverview.jsx"; 
import Courses from "./pages/Courses.jsx"; // ১. এটি ইমপোর্ট করুন

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
          <Route index element={<Navigate to="teacher" replace />} /> {/* টিচারদের জন্য My Courses আগে আসবে */}
          
          <Route path="overview" element={<DashboardOverview />} /> 
          
          {/* ২. এখানে TeacherHome এর বদলে Courses দিন */}
          <Route path="teacher" element={<Courses />} />
          
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="attendance" element={<Attendance />} /> 
          <Route path="add-complain" element={<AddComplain />} />
          <Route path="complains" element={<AdvisorComplains />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  ); 
}