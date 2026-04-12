import { useEffect, useState } from "react";
import "../styles/courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [credit, setCredit] = useState("");

  const API_BASE = "http://127.0.0.1:8000/api";

  // টোকেন গেট করার ফাংশন
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`, // এটিই সবচেয়ে গুরুত্বপূর্ণ অংশ
    };
  };

  async function fetchCourses() {
    try {
      const response = await fetch(`${API_BASE}/courses`, {
        headers: getAuthHeader(), // টোকেন পাঠানো হচ্ছে
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Fetch Error:", data);
        return;
      }

      setCourses(data);
    } catch (error) {
      console.error("Fetch courses error:", error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function addCourse(e) {
    e.preventDefault();

    if (!courseCode || !courseTitle || !credit) {
      return alert("Fill all fields");
    }

    try {
      const response = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: getAuthHeader(), // টোকেন পাঠানো হচ্ছে
        body: JSON.stringify({
          course_code: courseCode,
          course_name: courseTitle,
          credit: Number(credit),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert(data.message || "Course add failed");
        return;
      }

      setCourseCode("");
      setCourseTitle("");
      setCredit("");
      fetchCourses();
      alert("Course added successfully");
    } catch (error) {
      console.error("Add course error:", error);
      alert("Server error");
    }
  }

  async function deleteCourse(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`${API_BASE}/courses/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(), // টোকেন পাঠানো হচ্ছে
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        alert(data.message || "Delete failed");
        return;
      }

      fetchCourses();
    } catch (error) {
      console.error("Delete course error:", error);
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Courses Management</h2>
        <span className="pill green">{courses.length} total</span>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>Add New Course</h3>

          <form onSubmit={addCourse} className="courseForm">
            <label>
              Course Code
              <input
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CSE-101"
              />
            </label>

            <label>
              Title
              <input
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Programming"
              />
            </label>

            <label>
              Credit
              <input
                type="number"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                placeholder="3"
              />
            </label>

            <button className="btn" type="submit">
              Add Course
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Course List</h3>

          <div className="table">
            <div className="row head">
              <div>Code</div>
              <div>Title</div>
              <div>Credit</div>
              <div>Action</div>
            </div>

            {courses.map((c) => (
              <div className="row" key={c.id}>
                <div>{c.course_code}</div>
                <div>{c.course_name}</div>
                <div>{c.credit}</div>
                <div>
                  <button
                    className="btn danger tiny"
                    onClick={() => deleteCourse(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {!courses.length && <div className="empty">No courses available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}