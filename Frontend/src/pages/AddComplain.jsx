import { useState } from "react";
import axios from "axios";
import "../styles/addComplain.css";

export default function AddComplain() {
  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("Attendance Alert");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!studentId.trim()) {
      alert("Student ID is required");
      return;
    }

    if (!message.trim()) {
      alert("Message is required");
      return;
    }

   const payload = {
  student_id: studentId,
  type,
  message,
};

    console.log("Submitting complain payload:", payload);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-complain",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Complain success response:", response.data);

      alert(response.data.message || "Complain submitted successfully!");
      setStudentId("");
      setType("Attendance Alert");
      setMessage("");
    } catch (error) {
      console.log("Full complain error:", error);
      console.log("Complain error response:", error.response?.data);
      console.log("Validation errors:", error.response?.data?.errors);

      const validationErrors = error.response?.data?.errors;
      let errorMessage = "Failed to submit complain.";

      if (validationErrors) {
        errorMessage = Object.values(validationErrors).flat().join("\n");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="complainPage">
      <div className="complainCard">
        <h1 className="complainTitle">Add New Complain / Alert</h1>
        <p className="complainSubtitle">
          Fill out the form to notify students or advisors.
        </p>

        <form onSubmit={handleSubmit} className="complainForm">
          <label className="complainLabel">
            Student ID
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 221015"
              className="complainInput"
            />
          </label>

          <label className="complainLabel">
            Complain Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="complainInput"
            >
              <option value="Attendance Alert">
                Attendance Alert (Sends to Advisor)
              </option>
              <option value="Academic Alert">Academic Alert</option>
              <option value="Behavioral Alert">Behavioral Alert</option>
              <option value="General Complaint">General Complaint</option>
            </select>
          </label>

          <label className="complainLabel">
            Additional Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detailed reason..."
              rows={6}
              className="complainTextarea"
            />
          </label>

          <button className="complainButton" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Add Complain"}
          </button>
        </form>
      </div>
    </div>
  );
}