import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx";
import Courses from "./pages/Courses.jsx";
import AssessmentPage from "./pages/AssessmentPage.jsx";
import Attendance from "./pages/Attendance.jsx"; // ১. নতুন ফাইলটি এখানে ইমপোর্ট করা হয়েছে
import AddComplain from "./pages/AddComplain.jsx";
import AdvisorComplains from "./pages/AdvisorComplains.jsx";

function AdminHome() {
  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <p>Welcome to Academy Track Admin Panel.</p>
    </div>
  );
}

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
        {/* পাবলিক রাউটস */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* প্রোটেক্টেড ড্যাশবোর্ড রাউটস */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="admin" replace />} />

          {/* রোল ভিত্তিক হোম পেজ */}
          <Route path="admin" element={<AdminHome />} />
          <Route path="teacher" element={<TeacherHome />} />
          <Route path="student" element={<StudentHome />} />
          <Route path="advisor" element={<AdvisorHome />} />

          {/* মেনু আইটেম রাউটস */}
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assessments" element={<AssessmentPage />} />
          
          {/* ২. অ্যাটেনডেন্স রাউটটি এখানে যুক্ত করা হলো */}
          <Route path="attendance" element={<Attendance />} /> 

          <Route path="add-complain" element={<AddComplain />} />
          <Route path="complains" element={<AdvisorComplains />} />
        </Route>

        {/* কোনো রাউট না মিললে লগইন পেজে পাঠিয়ে দিবে */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}