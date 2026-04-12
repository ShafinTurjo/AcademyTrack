import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role?.trim().toLowerCase();

  useEffect(() => {
    if (role === "admin") fetchStudents();
  }, [role]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  async function addStudent(e) {
    e.preventDefault();
    if (!name || !studentId || !department) return alert("Fill all fields");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students",
        { name, student_id: studentId, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert("Student added successfully!");
        fetchStudents();
        setName(""); setStudentId(""); setDepartment("");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add student.");
    }
  }

  async function deleteStudent(id) {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setStudents(students.filter((s) => s.id !== id));
      }
    } catch (error) {
      alert("Delete failed.");
    }
  }

  if (role !== "admin") {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: "center", marginTop: "50px", padding: "40px" }}>
          <h2 style={{ color: "#d9534f" }}>Access Denied</h2>
          <p>Only admins can manage student records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Students Management</h2>
        <span className="pill">{students.length} total</span>
      </div>
      <div className="grid2">
        <div className="card">
          <h3>Add New Student</h3>
          <form onSubmit={addStudent} className="studentForm">
            <label>Student Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Shafin" />
            </label>
            <label>Student ID
              <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 221015" />
            </label>
            <label>Department
              <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. CSE" />
            </label>
            <button className="btn" type="submit">Save Student</button>
          </form>
        </div>
        <div className="card">
          <h3>Student List</h3>
          {loading ? <p>Loading...</p> : (
            <div className="table">
              <div className="row head">
                <div>Name</div><div>ID</div><div>Dept</div><div>Action</div>
              </div>
              {students.map((s) => (
                <div className="row" key={s.id}>
                  <div>{s.user?.name || s.name}</div>
                  <div>{s.student_id}</div>
                  <div>{s.department}</div>
                  <div>
                    <button className="btn danger tiny" onClick={() => deleteStudent(s.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {!students.length && <div className="empty">No students found.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}