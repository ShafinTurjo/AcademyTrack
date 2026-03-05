import { useState } from "react";
import React from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [credit, setCredit] = useState("");

  function addCourse(e) {
    e.preventDefault();

    if (!courseCode || !courseTitle || !credit) {
      alert("Fill all fields");
      return;
    }

    // Duplicate course code check
    const exists = courses.some(
      (c) => c.courseCode.toLowerCase() === courseCode.toLowerCase()
    );
    if (exists) {
      alert("This course code already exists!");
      return;
    }

    const newCourse = {
      id: Date.now(),
      courseCode,
      courseTitle,
      credit: Number(credit),
    };

    setCourses([...courses, newCourse]);

    setCourseCode("");
    setCourseTitle("");
    setCredit("");
  }

  function deleteCourse(id) {
    const filtered = courses.filter((c) => c.id !== id);
    setCourses(filtered);
  }

  return (
    <div>
      <h2>Courses Management</h2>

      {/* Add Course Form */}
      <form onSubmit={addCourse} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Course Code (ex: CSE-101)"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        <br />
        <br />

        <input
          placeholder="Course Title (ex: Programming)"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Credit (ex: 3)"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Add Course</button>
      </form>

      {/* Course List */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Title</th>
            <th>Credit</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No courses added yet
              </td>
            </tr>
          ) : (
            courses.map((c) => (
              <tr key={c.id}>
                <td>{c.courseCode}</td>
                <td>{c.courseTitle}</td>
                <td>{c.credit}</td>
                <td>
                  <button onClick={() => deleteCourse(c.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}