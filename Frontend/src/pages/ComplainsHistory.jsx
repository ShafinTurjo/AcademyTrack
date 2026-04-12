import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/students.css";

export default function ComplainsHistory() {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplains();
  }, []);

  const fetchComplains = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/advisor/complains",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplains(response.data.complains || []);
    } catch (error) {
      console.error("Error fetching complains:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Complains History</h2>
        <span className="pill">{complains.length} total</span>
      </div>
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table">
            <div className="row head">
              <div>Type</div>
              <div>Student ID</div>
              <div>Description</div>
              <div>Status</div>
            </div>
            {complains.map((c) => (
              <div className="row" key={c.id}>
                <div>{c.type}</div>
                <div>{c.student?.student_id ?? "N/A"}</div>
                <div>{c.description ?? "-"}</div>
                <div>{c.status}</div>
              </div>
            ))}
            {!complains.length && (
              <div className="empty">No complains found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}