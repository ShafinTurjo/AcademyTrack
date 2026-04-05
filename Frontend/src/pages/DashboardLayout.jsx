import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    nav("/login", { replace: true });
  }

  const menu = {
    admin: [
      { path: "/dashboard/admin", label: "Dashboard" },
      { path: "/dashboard/students", label: "Students" },
      { path: "/dashboard/courses", label: "Courses" },
    ],
    teacher: [
      { path: "/dashboard/teacher", label: "Dashboard" },
      { path: "/dashboard/courses", label: "Courses" },
    ],
    student: [
      { path: "/dashboard/student", label: "Dashboard" },
    ],
    advisor: [
      { path: "/dashboard/advisor", label: "Dashboard" },
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
            <div className="dashSub">AUST • {role ? role : "Dashboard"}</div>
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