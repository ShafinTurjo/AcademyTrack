import { useState } from "react";
import React from "react";

export default function Students() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  function addStudent(e){
    e.preventDefault();

    if(!name || !studentId || !department){
      alert("Fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      studentId: studentId,
      department: department
    };

    setStudents([...students, newStudent]);

    setName("");
    setStudentId("");
    setDepartment("");
  }

  function deleteStudent(id){
    const filtered = students.filter((s) => s.id !== id);
    setStudents(filtered);
  }

  return (
    <div>

      <h2>Students Management</h2>

      {/* Add Student Form */}

      <form onSubmit={addStudent} style={{marginBottom:"20px"}}>

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e)=>setStudentId(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Department"
          value={department}
          onChange={(e)=>setDepartment(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Add Student</button>

      </form>


      {/* Student List */}

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s)=>(
            <tr key={s.id}>

              <td>{s.name}</td>
              <td>{s.studentId}</td>
              <td>{s.department}</td>

              <td>
                <button onClick={()=>deleteStudent(s.id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}