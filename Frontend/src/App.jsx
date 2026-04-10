import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx"; 
import Courses from "./pages/Courses.jsx";

// কমপ্লেইন সিস্টেমের জন্য প্রয়োজনীয় পেজগুলো
import AddComplain from "./pages/AddComplain.jsx";
import AdvisorComplains from "./pages/AdvisorComplains.jsx";

function AdminHome() { return <div className="card"><h2>Admin Dashboard</h2><p>Welcome to Academy Track Admin Panel.</p></div>; }
function TeacherHome() { return <div className="card"><h2>Teacher Dashboard</h2><p>Manage your classes and students here.</p></div>; }
function StudentHome() { return <div className="card"><h2>Student Dashboard</h2><p>Check your profile and grades.</p></div>; }
function AdvisorHome() { return <div className="card"><h2>Advisor Dashboard</h2><p>View your advised students' progress.</p></div>; }

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
        {/* রুট পাথ সরাসরি লগইন এ নিয়ে যাবে */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ড্যাশবোর্ড এবং তার সাব-রাউটগুলো */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          
          <Route index element={<Navigate to="admin" replace />} />

          {/* রোল ভিত্তিক হোম পেজ */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="teacher" element={<TeacherHome />} />
          <Route path="student" element={<StudentHome />} />
          <Route path="advisor" element={<AdvisorHome />} />

          {/* জেনারেল পেজগুলো */}
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} /> 
          <Route path="courses" element={<Courses />} />

          {/* কমপ্লেইন সিস্টেম রাউট (মাইলস্টোন ২) */}
          <Route path="add-complain" element={<AddComplain />} />
          <Route path="complains" element={<AdvisorComplains />} />
          
        </Route>

        {/* ভুল পাথে গেলে লগইন এ পাঠিয়ে দিবে */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}