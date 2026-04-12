import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCheck, Book, Users, Send } from 'lucide-react';
import '../styles/attendance.css'; // সিএসএস লিঙ্ক করা হলো

const Attendance = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://127.0.0.1:8000/api/courses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(res.data);
            } catch (err) { console.error(err); }
        };
        fetchCourses();
    }, []);

    const handleCourseChange = async (courseId) => {
        setSelectedCourse(courseId);
        if (!courseId) return setStudents([]);
        
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://127.0.0.1:8000/api/course-students/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data.data.map(s => ({ ...s, present: true })));
        } catch (err) { alert("Error fetching students"); }
        setLoading(false);
    };

    const toggleAttendance = (id) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, present: !s.present } : s));
    };

    return (
        <div className="attendance_container">
            <div className="attendance_header">
                <h1><UserCheck size={35} /> Student Attendance</h1>
                <p className="sub_text">Manage and track daily classroom presence efficiently.</p>
            </div>

            <button className="submit_btn"><Send size={16} /> Submit Records</button>

            <div className="selection_section">
                <div className="input_group">
                    <label>Select Course</label>
                    <select 
                        className="custom_input"
                        onChange={(e) => handleCourseChange(e.target.value)}
                    >
                        <option value="">Choose a course...</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.course_name}</option>)}
                    </select>
                </div>

                <div className="input_group">
                    <label>Session Date</label>
                    <input 
                        type="date" 
                        className="custom_input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="stats_bar">
                <span style={{fontWeight: 'bold'}}>{students.length} Total Students</span>
                <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Users size={18} /> Total Students
                </span>
            </div>

            <div className="attendance_card">
                <table className="attendance_table">
                    <thead>
                        <tr>
                            <th>Student Roll</th>
                            <th>Full Name</th>
                            <th>Attendance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>
                                    <button 
                                        className={`status_toggle ${!student.present ? 'absent' : ''}`}
                                        onClick={() => toggleAttendance(student.id)}
                                    >
                                        {student.present ? 'PRESENT' : 'ABSENT'}
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" style={{textAlign: 'center', padding: '50px', color: '#718096'}}>
                                    <Book size={40} style={{marginBottom: '10px', opacity: 0.5}} /><br/>
                                    Please select a course to start attendance.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;