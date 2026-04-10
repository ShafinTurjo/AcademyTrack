import { useState } from "react";
import "../styles/students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  // ১. ইউজার রোল চেক করার লজিক
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role?.trim().toLowerCase();

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

  // ২. যদি এডমিন না হয়, তবে পুরো পেজটিই ব্লক করে দেওয়া
  if (role !== "admin") {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', marginTop: '50px', padding: '40px' }}>
          <h2 style={{ color: '#d9534f' }}>Access Denied</h2>
          <p>You do not have permission to view or manage student data.</p>
        </div>
      </div>
    );
  }

  // ৩. শুধুমাত্র ADMIN হলে নিচের এই পুরো অংশটি (Header + Form + Table) রেন্ডার হবে
  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Students Management (Admin Only)</h2>
        <span className="pill">{students.length} total</span>
      </div>

      <div className="grid2">
        {/* Add Student Form Card */}
        <div className="card">
          <h3>Add New Student</h3>
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

            <button className="btn" type="submit">Add Student</button>
          </form>
        </div>

        {/* Student List Card */}
        <div className="card">
          <h3>Student List</h3>
          <div className="table">
            <div className="row head">
              <div>Name</div><div>ID</div><div>Dept</div><div>Action</div>
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

            {!students.length && <div className="empty">No students found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}