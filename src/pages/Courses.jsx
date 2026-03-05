import { useState } from "react";
import "../styles/courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [credit, setCredit] = useState("");

  function addCourse(e) {
    e.preventDefault();
    if (!courseCode || !courseTitle || !credit) return alert("Fill all fields");

    const exists = courses.some((c) => c.courseCode.toLowerCase() === courseCode.toLowerCase());
    if (exists) return alert("This course code already exists!");

    setCourses([...courses, { id: Date.now(), courseCode, courseTitle, credit: Number(credit) }]);
    setCourseCode(""); setCourseTitle(""); setCredit("");
  }

  function deleteCourse(id) {
    setCourses(courses.filter((c) => c.id !== id));
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Courses</h2>
        <span className="pill green">{courses.length} total</span>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Add Course</h3>

          <form onSubmit={addCourse} className="courseForm">
            <label>
              Course Code
              <input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="e.g. CSE-101" />
            </label>

            <label>
              Title
              <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="e.g. Programming" />
            </label>

            <label>
              Credit
              <input type="number" value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="3" />
            </label>

            <button className="btn" type="submit">Add</button>
          </form>
        </div>

        <div className="card">
          <h3>Course List</h3>

          <div className="table">
            <div className="row head">
              <div>Code</div><div>Title</div><div>Credit</div><div></div>
            </div>

            {courses.map((c) => (
              <div className="row" key={c.id}>
                <div>{c.courseCode}</div>
                <div>{c.courseTitle}</div>
                <div>{c.credit}</div>
                <div>
                  <button className="btn danger tiny" onClick={() => deleteCourse(c.id)}>Delete</button>
                </div>
              </div>
            ))}

            {!courses.length && <div className="empty">No courses yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}