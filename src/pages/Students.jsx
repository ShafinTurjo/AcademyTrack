import { useState } from "react";
import "../styles/students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  function addStudent(e) {
    e.preventDefault();
    if (!name || !studentId || !department) return alert("Fill all fields");

    setStudents([
      ...students,
      { id: Date.now(), name, studentId, department },
    ]);

    setName(""); setStudentId(""); setDepartment("");
  }

  function deleteStudent(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Students</h2>
        <span className="pill">{students.length} total</span>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Add Student</h3>

          <form onSubmit={addStudent} className="studentForm">
            <label>
              Student Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Shafin" />
            </label>

            <label>
              Student ID
              <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 221015" />
            </label>

            <label>
              Department
              <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. CSE" />
            </label>

            <button className="btn" type="submit">Add</button>
          </form>
        </div>

        <div className="card">
          <h3>Student List</h3>

          <div className="table">
            <div className="row head">
              <div>Name</div><div>ID</div><div>Dept</div><div></div>
            </div>

            {students.map((s) => (
              <div className="row" key={s.id}>
                <div>{s.name}</div>
                <div>{s.studentId}</div>
                <div>{s.department}</div>
                <div>
                  <button className="btn danger tiny" onClick={() => deleteStudent(s.id)}>Delete</button>
                </div>
              </div>
            ))}

            {!students.length && <div className="empty">No students yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}