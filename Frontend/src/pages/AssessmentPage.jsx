import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../styles/assessment.css";

export default function AssessmentPage() {
  const [form, setForm] = useState({
    student_id: "",
    course_id: "",
    type: "quiz",
    marks: "",
    total_marks: 100,
    quiz_date: "",
    quiz_time: "",
  });

  const [assessments, setAssessments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/assessments", {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("GET assessments response:", res.data);
      setAssessments(res.data.data || []);
    } catch (err) {
      console.error("GET error:", err.response?.data || err.message);
      setError("Assessment list load failed");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const gradePreview = useMemo(() => {
    const m = Number(form.marks);
    const t = Number(form.total_marks);

    if (!form.marks || !form.total_marks || t <= 0) return "N/A";

    const p = (m / t) * 100;
    if (p >= 80) return "A+";
    if (p >= 75) return "A";
    if (p >= 70) return "A-";
    if (p >= 65) return "B+";
    if (p >= 60) return "B";
    if (p >= 55) return "B-";
    if (p >= 50) return "C+";
    if (p >= 45) return "C";
    if (p >= 40) return "D";
    return "F";
  }, [form.marks, form.total_marks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      student_id: Number(form.student_id),
      course_id: Number(form.course_id),
      type: form.type,
      marks: Number(form.marks),
      total_marks: Number(form.total_marks),
      quiz_date: form.quiz_date,
      quiz_time: form.quiz_time,
    };

    console.log("POST payload:", payload);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/assessments",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("POST response:", res.data);
      setMessage(res.data.message || "Assessment added successfully");

      setForm({
        student_id: "",
        course_id: "",
        type: "quiz",
        marks: "",
        total_marks: 100,
        quiz_date: "",
        quiz_time: "",
      });

      fetchAssessments();
    } catch (err) {
      console.error("POST error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Assessment add failed"
      );
    }
  };

  return (
    <div className="assessmentPage">
      <h1>Assessments</h1>

      {message && <div className="successBox">{message}</div>}
      {error && <div className="errorBox">{error}</div>}

      <div className="assessmentGrid">
        <div className="assessmentCard">
          <h2>Add Assessment</h2>

          <form onSubmit={handleSubmit} className="assessmentForm">
            <input
              type="number"
              name="student_id"
              placeholder="Student ID"
              value={form.student_id}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="course_id"
              placeholder="Course ID"
              value={form.course_id}
              onChange={handleChange}
              required
            />

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
            </select>

            <input
              type="number"
              name="marks"
              placeholder="Marks"
              value={form.marks}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="total_marks"
              placeholder="Total Marks"
              value={form.total_marks}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="quiz_date"
              value={form.quiz_date}
              onChange={handleChange}
            />

            <input
              type="time"
              name="quiz_time"
              value={form.quiz_time}
              onChange={handleChange}
            />

            <div className="previewBox">
              Grade: <strong>{gradePreview}</strong>
            </div>

            <button type="submit" className="submitBtn">
              Add Assessment
            </button>
          </form>
        </div>

        <div className="assessmentCard">
          <h2>Assessment List</h2>

          {assessments.length === 0 ? (
            <p>No data</p>
          ) : (
            <table className="assessmentTable">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Type</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.student_id}</td>
                    <td>{a.course_id}</td>
                    <td>{a.type}</td>
                    <td>{a.marks}/{a.total_marks}</td>
                    <td>{a.grade}</td>
                    <td>{a.quiz_date || "-"}</td>
                    <td>{a.quiz_time || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}