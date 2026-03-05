import { Link, Outlet } from "react-router-dom";
import React from "react";

export default function DashboardLayout() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <h3>Academy Track</h3>
        <nav style={{ display: "grid", gap: 10, marginTop: 16 }}>
          <Link to="/dashboard/students">Students</Link>
          <Link to="/dashboard/courses">Courses</Link>
        </nav>
      </aside>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}