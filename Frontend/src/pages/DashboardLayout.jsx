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
      { path: "/dashboard/courses", label: "Courses" },
    ],
    teacher: [
      { path: "/dashboard/courses", label: "Courses" },
    ],
    student: [
      { path: "/dashboard/students", label: "Dashboard" },
    ],
    advisor: [
      { path: "/dashboard/students", label: "Dashboard" },
    ],
  };

  const links = menu[role] || [
    { path: "/dashboard/students", label: "Students" },
    { path: "/dashboard/courses", label: "Courses" },
  ];

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