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
    </div>
  );
}