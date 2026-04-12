import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();
<<<<<<< Updated upstream
=======
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role?.trim().toLowerCase();
>>>>>>> Stashed changes

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login", { replace: true });
  }


  const menu = {
    admin: [
<<<<<<< Updated upstream
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
=======
      { path: "/dashboard/overview", label: "Dashboard" },
      { path: "/dashboard/students", label: "Students" },
      { path: "/dashboard/teachers", label: "Teachers" },
      { path: "/dashboard/add-complain", label: "Add Complain" },
    ],
    teacher: [
      { path: "/dashboard/teacher", label: "My Courses" },
      { path: "/dashboard/attendance", label: "Attendance" },
      { path: "/dashboard/assessments", label: "Assessments" },
    ],
    student: [
      { path: "/dashboard/student-enroll", label: "Enroll Courses" },
    ],
    advisor: [
      { path: "/dashboard/students", label: "Advised Students" },
      { path: "/dashboard/complains", label: "Complains History" },
>>>>>>> Stashed changes
    ],
    advisor: [{ path: "/advisor", label: "Dashboard" }],
  };

  const links = menu[role] || [];
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

  return (
    <div className="dash">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">AT</div>
          <div>
            <div className="dashTitle">Academy Track</div>
<<<<<<< Updated upstream
            <div className="dashSub">AUST • Dashboard</div>
=======
            <div className="dashSub">
              AUST • {role ? role.toUpperCase() : "Dashboard"}
            </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

        <button className="dashBtn ghost" onClick={logout}>Logout</button>
=======
        <button className="dashBtn ghost" onClick={logout}>
          Logout
        </button>
>>>>>>> Stashed changes
      </aside>
      <main className="dashMain">
        <Outlet />
      </main>
    </div>
  );
}