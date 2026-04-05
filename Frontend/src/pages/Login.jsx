import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role?.trim().toLowerCase();

      if (role === "student") {
        nav("/dashboard/students");
      } else if (role === "teacher") {
        nav("/dashboard/courses");
      } else if (role === "admin") {
        nav("/dashboard/students");
      } else if (role === "advisor") {
        nav("/dashboard/students");
      } else {
        alert("User role not recognized: " + data.user?.role);
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

          <button className="loginBtn" type="submit">
            Login
          </button>

          <div className="loginHint">
            Use your registered email and password
          </div>
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