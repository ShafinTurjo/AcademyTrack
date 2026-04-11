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
import DashboardOverview from "./pages/DashboardOverview.jsx"; // ৩. নতুন ওভারভিউ পেজটি ইমপোর্ট করুন

// টিচার, স্টুডেন্ট এবং অ্যাডভাইজর হোম আগের মতোই থাকবে
function TeacherHome() {
  return (
    <div className="card">
      <h2>Teacher Dashboard</h2>
      <p>Manage your classes and students here.</p>
    </div>
  );
}

function StudentHome() {
  return (
    <div className="card">
      <h2>Student Dashboard</h2>
      <p>Check your profile and grades.</p>
    </div>
  );
}

function AdvisorHome() {
  return (
    <div className="card">
      <h2>Advisor Dashboard</h2>
      <p>View your advised students' progress.</p>
    </div>
  );
}

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
          {/* ১. ডিফল্টভাবে এখন ওভারভিউ পেজে নিয়ে যাবে */}
          <Route index element={<Navigate to="overview" replace />} />

          {/* ২. রোল ভিত্তিক রাউটস */}
          <Route path="overview" element={<DashboardOverview />} /> 
          <Route path="teacher" element={<TeacherHome />} />
          <Route path="student" element={<StudentHome />} />
          <Route path="advisor" element={<AdvisorHome />} />

          {/* ৩. মেনু আইটেম রাউটস (Courses এবং Assessments রিমুভ করা হয়েছে) */}
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