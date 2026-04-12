<<<<<<< HEAD
import { useState } from "react";
import axios from "axios";
import "../styles/students.css";

export default function AddComplain() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!type) return alert("Complain type is required");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-complain",
        { type, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert("Complain submitted successfully!");
        setType("");
        setDescription("");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit complain.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Add Complain</h2>
      </div>
      <div className="grid2">
        <div className="card">
          <h3>Submit a Complain</h3>
          <form onSubmit={handleSubmit} className="studentForm">
            <label>
              Complain Type
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Academic, Behavioral"
              />
            </label>
            <label>
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
                rows={4}
                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </label>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Complain"}
            </button>
          </form>
        </div>
      </div>
=======
import React, { useState } from "react";
import axios from "axios";

export default function AddComplain() {
  const [formData, setFormData] = useState({
    studentId: "", // এটি স্টেটে থাকবে
    type: "Attendance Alert (Sends to Advisor)",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      
      // পরিবর্তন এখানে: ব্যাকএন্ডের student_id কলামের সাথে নাম মিলানো হয়েছে
      const response = await axios.post("http://localhost:8000/api/add-complain", {
        student_id: formData.studentId, 
        type: formData.type,
        message: formData.message
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json" // এই হেডারটি ভ্যালিডেশন এরর বুঝতে সাহায্য করবে
        }
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Complain added successfully!" });
        setFormData({ studentId: "", type: "Attendance Alert (Sends to Advisor)", message: "" });
      }
    } catch (error) {
      console.error("Validation details:", error.response?.data?.errors);
      // এরর মেসেজ হ্যান্ডলিং
      const errorMsg = error.response?.data?.message || "Validation Error. Check all fields.";
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-complain-container">
      <h2>Add New Complain / Alert</h2>
      <p>Fill out the form to notify students or advisors.</p>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            placeholder="e.g. 221015"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Complain Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Attendance Alert (Sends to Advisor)">Attendance Alert (Sends to Advisor)</option>
            <option value="Lab Report Pending">Lab Report Pending</option>
            <option value="Proctor Fine">Proctor Fine</option>
            <option value="Academic Warning">Academic Warning</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Message (Optional)</label>
          <textarea
            placeholder="Detailed reason..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="dashBtn" disabled={loading}>
          {loading ? "Adding..." : "Add Complain"}
        </button>
      </form>
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
    </div>
  );
}