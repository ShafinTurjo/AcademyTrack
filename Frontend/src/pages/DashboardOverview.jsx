import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardOverview() {
  const [data, setData] = useState({
    students: [], teachers: [], complains: [],
    totalStudents: 0, totalTeachers: 0, totalComplains: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin-stats");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overview-container">
      <h2>Admin Dashboard Overview</h2>
      
      <div className="stats-grid">
        {/* Total Students Card */}
        <div className="stat-card">
          <h3>Total Students: {data.totalStudents}</h3>
          <ul className="mini-list">
            {data.students.slice(0, 10).map(s => <li key={s.id}>{s.name} ({s.student_id})</li>)}
          </ul>
        </div>

      
        <div className="stat-card">
          <h3>Total Teachers: {data.totalTeachers}</h3>
          <ul className="mini-list">
            {data.teachers.slice(0, 10).map(t => <li key={t.id}>{t.name}</li>)}
          </ul>
        </div>

       
        <div className="stat-card">
          <h3>Total Complains: {data.totalComplains}</h3>
          <ul className="mini-list">
            {data.complains.slice(0, 10).map(c => (
              <li key={c.id}>ID: {c.student_id} - {c.type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}