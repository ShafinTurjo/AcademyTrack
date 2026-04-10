import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const role = user?.role?.trim().toLowerCase();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    nav("/login", { replace: true });
  }

  const menu = {
    admin: [
      { path: "/dashboard/students", label: "Students" },
      { path: "/dashboard/teachers", label: "Teachers" },
      { path: "/dashboard/courses", label: "Courses" },
      { path: "/dashboard/assessments", label: "Assessments" },
    ],
    teacher: [
      { path: "/dashboard/courses", label: "My Courses" },
      { path: "/dashboard/attendance", label: "Attendance" },
      { path: "/dashboard/assessments", label: "Assessments" },
    ],
    student: [
      { path: "/dashboard/profile", label: "My Profile" },
      { path: "/dashboard/grades", label: "Grades" },
    ],
    advisor: [
      { path: "/dashboard/students", label: "Advised Students" },
    ],
  };

  const links = menu[role] || [];

  return (
    <div className="dash">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">AT</div>
          <div>
            <div className="dashTitle">Academy Track</div>
            <div className="dashSub">
              AUST • {role ? role.toUpperCase() : "Dashboard"}
            </div>
          </div>
        </div>

        <nav className="dashNav">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "dashLink active" : "dashLink"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="dashBtn ghost" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="dashMain">
        <Outlet />
      </main>
    </div>
  );
}