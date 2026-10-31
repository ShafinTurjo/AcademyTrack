import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export default function ProtectedRoute() {
  const [state, setState] = useState({ loading: true, user: null });
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    if (!token) {
      setState({ loading: false, user: null });
      return () => controller.abort();
    }
    fetch(`${API_BASE}/user`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        setState({ loading: false, user: data.user });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setState({ loading: false, user: null });
      });
    return () => controller.abort();
  }, []);

  if (state.loading) return <p>Checking your session...</p>;
  if (!state.user) return <Navigate to="/login" replace state={{ from: location }} />;

  const role = state.user.role?.trim().toLowerCase();
  const url = location.pathname;
  const allowed = {
    "/dashboard/overview": ["admin"],
    "/dashboard/students": ["admin", "advisor"],
    "/dashboard/teachers": ["admin"],
    "/dashboard/add-complain": ["admin", "advisor"],
    "/dashboard/teacher": ["teacher"],
    "/dashboard/attendance": ["teacher", "admin"],
    "/dashboard/assessments": ["teacher", "admin"],
    "/dashboard/student-enroll": ["student"],
    "/dashboard/complains": ["advisor", "admin"],
    "/dashboard/courses": ["teacher", "admin", "student"],
  };
  if (allowed[url] && !allowed[url].includes(role)) {
    return <p>Access denied for this role.</p>;
  }

  return <Outlet />;
}
