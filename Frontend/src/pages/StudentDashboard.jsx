import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/courses.css"; // আপনি চাইলে স্টাইল ফাইল পরিবর্তন করতে পারেন

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://127.0.0.1:8000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      
      // ১. সব এভেইলেবল কোর্সের তালিকা ফেচ করা
      const resCourses = await axios.get(`${API_BASE}/courses`, { headers });
      setCourses(resCourses.data);

      // ২. স্টুডেন্টের অলরেডি এনরোল করা কোর্সের তালিকা ফেচ করা
      const resEnroll = await axios.get(`${API_BASE}/enrollments`, { headers });
      setEnrollments(resEnroll.data);
    } catch (error) {
      console.error("Error loading student data:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleEnroll(e) {
    e.preventDefault();
    if (!selectedCourse || !semester) return alert("Please select both course and semester.");

    try {
      const response = await axios.post(
        `${API_BASE}/enrollments`,
        { 
          course_id: selectedCourse,
          semester: semester 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Course successfully added to your semester!");
      fetchData(); // তালিকা রিফ্রেশ করা
      setSelectedCourse("");
      setSemester("");
    } catch (error) {
      alert(error.response?.data?.message || "Could not enroll. Maybe already enrolled?");
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <h2>Semester Course Enrollment</h2>
        <span className="pill green">{enrollments.length} Courses</span>
      </div>

      <div className="grid2">
        {/* এনরোলমেন্ট ফর্ম */}
        <div className="card">
          <h3>Add New Course</h3>
          <form onSubmit={handleEnroll} className="courseForm">
            <label>
              Select Semester
              <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="">-- Choose --</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </label>

            <label>
              Select Course
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">-- Choose Course --</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.course_code}: {c.course_name}
                  </option>
                ))}
              </select>
            </label>

            <button className="btn" type="submit">Enroll Course</button>
          </form>
        </div>

        {/* এনরোল করা কোর্সের তালিকা */}
        <div className="card">
          <h3>My Current Courses</h3>
          <div className="table">
            <div className="row head">
              <div>Sem.</div><div>Code</div><div>Title</div>
            </div>
            {enrollments.map((en) => (
              <div className="row" key={en.id}>
                <div>{en.semester}</div>
                <div>{en.course?.course_code}</div>
                <div>{en.course?.course_name}</div>
              </div>
            ))}
            {!enrollments.length && <div className="empty">No courses enrolled yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}