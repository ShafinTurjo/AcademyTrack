import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login", { replace: true });
  }

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
          <NavLink
            to="/dashboard/students"
            className={({ isActive }) =>
              isActive ? "dashLink active" : "dashLink"
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/dashboard/courses"
            className={({ isActive }) =>
              isActive ? "dashLink active" : "dashLink"
            }
          >
            Courses
          </NavLink>
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