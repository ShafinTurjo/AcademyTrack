import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login", { replace: true });
  }


  const menu = {
    admin: [
      { path: "/admin", label: "Dashboard" },
      { path: "/admin/students", label: "Students" },
      { path: "/admin/courses", label: "Courses" },
    ],
    teacher: [
      { path: "/teacher", label: "Dashboard" },
      { path: "/teacher/courses", label: "Courses" },
    ],
    student: [
      { path: "/student", label: "Dashboard" },
      { path: "/about", label: "About Us" },
      { path: "/contact", label: "Contact Us" },
    ],
    advisor: [{ path: "/advisor", label: "Dashboard" }],
  };

  const links = menu[role] || [];


  return (
    <div className="dash">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">AT</div>
          <div>
            <div className="dashTitle">Academy Track</div>
            <div className="dashSub">AUST • Dashboard</div>
          </div>
        </div>

        <nav className="dashNav">
          <NavLink to="/dashboard/students" className={({ isActive }) => (isActive ? "dashLink active" : "dashLink")}>
            Students
          </NavLink>
          <NavLink to="/dashboard/courses" className={({ isActive }) => (isActive ? "dashLink active" : "dashLink")}>
            Courses
          </NavLink>
        </nav>

        <button className="dashBtn ghost" onClick={logout}>Logout</button>
      </aside>

      <main className="dashMain">
        <Outlet />
      </main>
    </div>
  );
}