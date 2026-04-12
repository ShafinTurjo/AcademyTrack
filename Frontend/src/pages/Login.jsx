import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    if (!username.trim() || !password.trim()) {
      alert("Email and password required");
      return;
    }
<<<<<<< Updated upstream

=======
    setLoading(true);
>>>>>>> Stashed changes
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });
<<<<<<< Updated upstream

      const data = await res.json();

=======
      const data = await res.json();
>>>>>>> Stashed changes
      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }
<<<<<<< Updated upstream

=======
      const role = data.user?.role?.trim().toLowerCase();
>>>>>>> Stashed changes
      localStorage.setItem("token", data.token);

<<<<<<< Updated upstream
      const userRes = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
          Accept: "application/json",
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        alert(userData.message || "Failed to fetch user");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "admin") {
        nav("/admin");
      } else if (userData.role === "teacher") {
        nav("/teacher");
      } else if (userData.role === "student") {
        nav("/student");
      } else if (userData.role === "advisor") {
        nav("/advisor");
=======
      if (role === "student") {
        nav("/dashboard/student-enroll");
      } else if (role === "teacher") {
        nav("/dashboard/teacher");
      } else if (role === "admin") {
        nav("/dashboard/overview");
      } else if (role === "advisor") {
        nav("/dashboard/students");
>>>>>>> Stashed changes
      } else {
        alert("User role not recognized");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <div className="loginHeading">
          <div className="loginBadge">AUST</div>
          <h2>Academy Track</h2>
          <p>Sign in to continue</p>
        </div>
        <form onSubmit={handleLogin} className="loginForm">
          <label>
            Email
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
<<<<<<< Updated upstream

          <button className="loginBtn" type="submit">
            Login
=======
          <button className="loginBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
>>>>>>> Stashed changes
          </button>
          <div className="loginHint">Use your registered email and password</div>
        </form>
      </div>
      <div className="loginLinks">
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="loginGlow"></div>
    </div>
  );
}