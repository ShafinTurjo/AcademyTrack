import React, { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css"; // আপনার আগের স্টাইল ব্যবহার করতে পারেন

export default function AddComplain() {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("Attendance");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // টোকেন গেট করা (যেহেতু আপনি রাউটটি প্রোটেক্টেড রেখেছেন)
    const token = localStorage.getItem("token");

    const data = {
      student_id: studentId,
      type: type,
      message: message || (type === "Attendance" ? "Attendance Alert: less than 70%" : ""),
    };

    try {
      const response = await axios.post("http://localhost:8000/api/add-complain", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setStatus({ type: "success", msg: "Complain added successfully!" });
        setStudentId("");
        setMessage("");
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Failed to add complain. Check Student ID." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-complain-container">
      <h2>Add New Complain / Alert</h2>
      <p>Fill out the form to notify students or advisors.</p>

      {status && (
        <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="complain-form">
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            value={studentId}
            placeholder="e.g. 221015"
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Complain Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Attendance">Attendance Alert (Sends to Advisor)</option>
            <option value="Lab Report">Lab Report Pending</option>
            <option value="Proctor Fine">Proctor Fine (500 TK)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Message (Optional)</label>
          <textarea
            value={message}
            placeholder="Detailed reason..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit" className="dashBtn" disabled={loading}>
          {loading ? "Submitting..." : "Add Complain"}
        </button>
      </form>
    </div>
  );
}