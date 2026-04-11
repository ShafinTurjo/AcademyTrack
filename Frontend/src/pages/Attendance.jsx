import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseCode] = useState("CSE-101"); // এটি আপনার প্রয়োজনমতো ডাইনামিক করতে পারেন

  // ১. ব্যাকএন্ড থেকে স্টুডেন্ট লিস্ট নিয়ে আসা
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students");
        // প্রতিটি স্টুডেন্টের সাথে ডিফল্টভাবে 'Present' স্ট্যাটাস যোগ করা
        const studentsWithStatus = response.data.map((s) => ({
          ...s,
          status: "Present",
        }));
        setStudents(studentsWithStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // ২. ড্রপডাউন থেকে স্ট্যাটাস পরিবর্তন করা
  const handleStatusChange = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  // ৩. ব্যাকএন্ডে অ্যাটেনডেন্স ডাটা পাঠানো (Postman এ যা টেস্ট করেছেন)
  const saveAttendance = async () => {
    const attendanceData = {
      course_code: courseCode,
      date: new Date().toISOString().slice(0, 10), // আজকের তারিখ (YYYY-MM-DD)
      students: students.map((s) => ({
        student_id: s.id,
        status: s.status,
      })),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/attendance", attendanceData);
      if (response.data.success) {
        alert("Attendance Saved Successfully!");
      }
    } catch (error) {
      alert("Error saving attendance. Check console.");
      console.error(error);
    }
  };

  if (loading) return <div className="text-white p-5">Loading Students...</div>;

  return (
    <div className="p-4" style={{ color: "#e2e8f0" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-4 shadow"
           style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderLeft: "6px solid #3b82f6" }}>
        <div>
          <h2 className="fw-bold mb-1 text-white">Class Attendance</h2>
          <p className="mb-0 text-secondary">Course: <span className="text-info">{courseCode}</span> | Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button onClick={saveAttendance} className="btn btn-primary px-4 fw-bold rounded-pill">
          Submit Attendance
        </button>
      </div>

      {/* Table */}
      <div className="card border-0 rounded-4 shadow-lg overflow-hidden" style={{ background: "#1e293b" }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead style={{ background: "#334155" }}>
              <tr>
                <th className="px-4 py-3">Roll</th>
                <th className="py-3">Name</th>
                <th className="py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td className="px-4 py-3 fw-bold text-secondary">{student.roll_no || student.id}</td>
                  <td className="py-3 fw-bold text-info">{student.name}</td>
                  <td className="py-3 text-center">
                    <select 
                      value={student.status}
                      onChange={(e) => handleStatusChange(student.id, e.target.value)}
                      className={`form-select form-select-sm mx-auto fw-bold w-auto border-0 ${
                        student.status === "Present" ? "text-success" : "text-danger"
                      }`}
                      style={{ background: "#0f172a" }}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;