import React, { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import "../styles/dashboard.css";

export default function Advisor() {

 const resultData = [
  { semester: 'Sem 1', gpa: 3.50 },
  { semester: 'Sem 2', gpa: 3.25 },
  { semester: 'Sem 3', gpa: 3.80 },
  { semester: 'Sem 4', gpa: 3.65 },
  { semester: 'Sem 5', gpa: 3.90 },
  { semester: 'Sem 6', gpa: 3.40 },
  { semester: 'Sem 7', gpa: 3.75 },
  { semester: 'Sem 8', gpa: 3.85 },
];
 
  const absentAlerts = [
    { id: '200204001', name: 'Shafin Tanzier Turjo', attendance: '72%' },
    { id: '200204045', name: 'Ismat Jahan Dola', attendance: '68%' },
  ];

  return (
    <div className="dashContent">
      <div className="dashHeader">
        <h2 className="dashTitle">Advisor Analytics</h2>
      </div>

      <div className="card" style={{ height: '350px', marginBottom: '25px', padding: '20px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Student Performance Trend (Avg. GPA)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={resultData}>
            <defs>
              <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 4]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Area type="monotone" dataKey="gpa" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>Attendance Alerts (Below 70%)</h3>
          <div className="alert-container">
            {absentAlerts.map((student, index) => (
              <div key={index} style={{ 
                background: '#0f172a', padding: '15px', borderRadius: '12px', 
                marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1px solid #1e293b'
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#f1f5f9' }}>{student.name}</p>
                  <small style={{ color: '#94a3b8' }}>ID: {student.id} | Attendance: <b style={{color: '#f87171'}}>{student.attendance}</b></small>
                </div>
                <button className="dashBtn" style={{ padding: '6px 15px', fontSize: '12px' }}>Send Notice</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>File Student Complain</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Student ID / Roll</label>
              <input type="text" className="dashInput" placeholder="e.g. 202601005" />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Reason for Complain</label>
              <textarea 
                className="dashInput" 
                style={{ height: '90px', paddingTop: '10px' }} 
                placeholder="Explain the issue clearly..."
              ></textarea>
            </div>
            <button className="dashBtn" style={{ width: '100%', marginTop: '5px' }}>Submit Complain</button>
          </div>
        </div>

      </div>
    </div>
  );
}