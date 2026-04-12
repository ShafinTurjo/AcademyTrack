import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashOverlay from "./pages/SplashOverlay.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Students from "./pages/Students.jsx";
import Teachers from "./pages/Teachers.jsx";
<<<<<<< HEAD
import Courses from "./pages/Courses.jsx";
<<<<<<< Updated upstream
=======
import DashboardOverview from "./pages/DashboardOverview.jsx";
import AddComplain from "./pages/AddComplain.jsx";
import ComplainsHistory from "./pages/ComplainsHistory.jsx";
>>>>>>> Stashed changes
=======
import Attendance from "./pages/Attendance.jsx"; 
import AddComplain from "./pages/AddComplain.jsx";
import AdvisorComplains from "./pages/AdvisorComplains.jsx";
import DashboardOverview from "./pages/DashboardOverview.jsx"; 
import Courses from "./pages/Courses.jsx"; 
import AssessmentPage from "./pages/AssessmentPage.jsx"; 

// নতুন ফাইলটি ইম্পোর্ট করা হলো
import StudentDashboard from "./pages/StudentDashboard.jsx"; 

function StudentHome() { return <div className="card"><h2>Student Dashboard</h2><p>Check your progress here.</p></div>; }
function AdvisorHome() { return <div className="card"><h2>Advisor Dashboard</h2><p>View advised students.</p></div>; }
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef

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
<<<<<<< HEAD
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
=======
          
          <Route index element={<Navigate to="overview" replace />} />
          
          <Route path="overview" element={<DashboardOverview />} /> 
          
          {/* টিচারদের জন্য রাউট */}
          <Route path="teacher" element={<Courses />} />
          <Route path="assessments" element={<AssessmentPage />} />
          <Route path="attendance" element={<Attendance />} /> 

          {/* স্টুডেন্টদের জন্য নতুন রাউট যোগ করা হলো */}
          <Route path="student-enroll" element={<StudentDashboard />} />
          <Route path="student" element={<StudentHome />} />
          
          {/* অ্যাডমিন এবং এডভাইজরদের জন্য রাউট */}
          <Route path="advisor" element={<AdvisorHome />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="add-complain" element={<AddComplain />} />
          <Route path="complains" element={<AdvisorComplains />} />
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  ); 
}