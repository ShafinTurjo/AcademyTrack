import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

export default function DashboardOverview() {
  const [data, setData] = useState({
    students: [],
    teachers: [],
    complains: [],
    totalStudents: 0,
    totalTeachers: 0,
    totalComplains: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin-stats");
        setData({
          students:       res.data.students      || [],
          teachers:       res.data.teachers      || [],
          complains:      res.data.complains     || [],
          totalStudents:  res.data.totalStudents  || 0,
          totalTeachers:  res.data.totalTeachers  || 0,
          totalComplains: res.data.totalComplains || 0,
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-white">Loading Overview...</div>;

  return (
    <div className="overview-wrapper">
      <h2 className="mb-4" style={{ fontWeight: 900 }}>Admin Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="count-header">
            <h3 className="dashTitle">Total Students: {data.totalStudents}</h3>
          </div>
          <div className="table-header">
            <span className="col-label">Name</span>
            <span className="col-label">Student ID</span>
          </div>
          <ul className="mini-list">
            {data.students.map((s, idx) => (
              <li key={idx} className="list-item">
                <span className="name-text">{s.name}</span>
                <span className="dashSub">({s.student_id})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stat-card">
          <div className="count-header">
            <h3 className="dashTitle">Total Teachers: {data.totalTeachers}</h3>
          </div>
          <div className="table-header">
            <span className="col-label">Name</span>
            <span className="col-label">Teacher ID</span>
          </div>
          <ul className="mini-list">
            {data.teachers.map((t, idx) => (
              <li key={idx} className="list-item">
                <span className="name-text">{t.name}</span>
                <span className="dashSub">({t.teacher_id})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stat-card">
          <div className="count-header">
            <h3 className="dashTitle">Total Complains: {data.totalComplains}</h3>
          </div>
          <div className="table-header">
            <span className="col-label">Complain Type</span>
            <span className="col-label">Student ID</span>
          </div>
          <ul className="mini-list">
            {data.complains.map((c, idx) => (
              <li key={idx} className="list-item">
                <span className="complain-type">{c.type}</span>
                <span className="dashSub">({c.student_id})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}