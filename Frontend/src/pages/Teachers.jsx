import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/students.css";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [department, setDepartment] = useState("");

  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role?.toLowerCase();

  useEffect(() => {
    if (role === "admin") fetchTeachers();
  }, [role]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  async function addTeacher(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/teachers",
        { name, email, teacher_id: teacherId, department },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert("Teacher Added!");
        fetchTeachers();
        setName(""); setEmail(""); setTeacherId(""); setDepartment("");
      }
    } catch (error) {
      alert("Failed to add teacher.");
    }
  }

  async function deleteTeacher(id) {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (error) {
      alert("Delete failed.");
    }
  }

  if (role !== "admin") return <div className="page"><h2>Access Denied</h2></div>;

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Teacher Management</h2>
        <span className="pill">{teachers.length} total</span>
      </div>
      <div className="grid2">
        <div className="card">
          <h3>Add New Teacher</h3>
          <form onSubmit={addTeacher} className="studentForm">
            <label>Name <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" /></label>
            <label>Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@aust.edu" /></label>
            <label>Teacher ID <input value={teacherId} onChange={(e) => setTeacherId(e.target.value)} placeholder="T-101" /></label>
            <label>Department <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="CSE" /></label>
            <button className="btn" type="submit">Save Teacher</button>
          </form>
        </div>
        <div className="card">
          <h3>Teacher List</h3>
          <div className="table">
            <div className="row head">
              <div>Name</div><div>ID</div><div>Dept</div><div>Action</div>
            </div>
            {teachers.map((t) => (
              <div className="row" key={t.id}>
                <div>{t.name}</div>
                <div>{t.teacher_id}</div>
                <div>{t.department}</div>
                <div><button className="btn danger tiny" onClick={() => deleteTeacher(t.id)}>Delete</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}