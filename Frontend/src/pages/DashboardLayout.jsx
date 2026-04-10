import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  const nav = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  // ইউজার রোলটি ছোট হাতের অক্ষরে এবং অতিরিক্ত স্পেস সরিয়ে নেওয়া হয়েছে
  const role = user?.role?.trim().toLowerCase(); 

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    nav("/login", { replace: true });
  }

  const menu = {
    // ১. অ্যাডমিন মেনুতে Teachers লিংক যোগ করা হয়েছে
    admin: [
      { path: "/dashboard/students", label: "Students" },
      { path: "/dashboard/teachers", label: "Teachers" }, // নতুন যোগ করা হয়েছে
      { path: "/dashboard/courses", label: "Courses" },
    ],
    teacher: [
      { path: "/dashboard/courses", label: "My Courses" },
      { path: "/dashboard/attendance", label: "Attendance" },
    ],
    student: [
      { path: "/dashboard/profile", label: "My Profile" },
      { path: "/dashboard/grades", label: "Grades" },
    ],
    advisor: [
      { path: "/dashboard/students", label: "Advised Students" },
    ],
  };

  // ইউজারের রোল অনুযায়ী সঠিক মেনু সিলেক্ট করা
  const links = menu[role] || []; 

  return (
    <div className="dash">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">AT</div>
          <div>
            <div className="dashTitle">Academy Track</div>
            {/* ডাইনামিক রোল ডিসপ্লে */}
            <div className="dashSub">AUST • {role ? role.toUpperCase() : "Dashboard"}</div>
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
        {/* এখানে পেজের কনটেন্টগুলো দেখাবে */}
        <Outlet />
      </main>
    </div>
  );
}