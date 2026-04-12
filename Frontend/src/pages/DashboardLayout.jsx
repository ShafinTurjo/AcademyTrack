import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();
<<<<<<< Updated upstream
=======
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role?.trim().toLowerCase();
>>>>>>> Stashed changes

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
<<<<<<< HEAD
<<<<<<< Updated upstream
      { path: "/admin", label: "Dashboard" },
      { path: "/admin/students", label: "Students" },
      { path: "/admin/courses", label: "Courses" },
=======
      { path: "/dashboard/overview", label: "Dashboard" },
      { path: "/dashboard/students", label: "Students" },
      { path: "/dashboard/teachers", label: "Teachers" },
      { path: "/dashboard/add-complain", label: "Add Complain" },
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
    ],
    teacher: [
      { path: "/dashboard/teacher", label: "My Courses" },
      { path: "/dashboard/attendance", label: "Attendance" },
      { path: "/dashboard/assessments", label: "Assessments" },
    ],
    // শুধুমাত্র Enroll Courses রাখা হয়েছে
    student: [
<<<<<<< HEAD
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
=======
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
      { path: "/dashboard/student-enroll", label: "Enroll Courses" },
    ],
    advisor: [
      { path: "/dashboard/students", label: "Advised Students" },
      { path: "/dashboard/complains", label: "Complains History" },
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
    ],
  };

  const links = menu[role] || [];
<<<<<<< Updated upstream

<<<<<<< HEAD
=======
>>>>>>> Stashed changes

=======
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
  return (
    <div className="dash">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">AT</div>
          <div>
            <div className="dashTitle">Academy Track</div>
<<<<<<< HEAD
<<<<<<< Updated upstream
            <div className="dashSub">AUST • Dashboard</div>
=======
            <div className="dashSub">
              AUST • {role ? role.toUpperCase() : "Dashboard"}
            </div>
>>>>>>> Stashed changes
=======
            <div className="dashSub">
              AUST • {role ? role.toUpperCase() : "Dashboard"}
            </div>
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
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
<<<<<<< Updated upstream

<<<<<<< HEAD
        <button className="dashBtn ghost" onClick={logout}>Logout</button>
=======
        <button className="dashBtn ghost" onClick={logout}>
          Logout
        </button>
>>>>>>> Stashed changes
=======
        <button className="dashBtn ghost" onClick={logout}>
          Logout
        </button>
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
      </aside>
      <main className="dashMain">
        <Outlet />
      </main>
    </div>
  );
}