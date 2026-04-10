import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdvisorComplains() {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/advisor/complains", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplains(response.data);
      } catch (error) {
        console.error("Error fetching complains:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplains();
  }, []);

  return (
    <div className="card">
      <h2>Advisor Dashboard - Attendance Alerts</h2>
      <p>List of students with attendance below 70%.</p>
      
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <table className="dashTable">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complains.length > 0 ? (
              complains.map((c) => (
                <tr key={c.id}>
                  <td>{c.student_id}</td>
                  <td>{c.message}</td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>No alerts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}