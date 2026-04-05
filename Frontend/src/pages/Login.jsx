import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    console.log("Login button clicked");

    if (!username.trim() || !password.trim()) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

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

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      alert("Login successful");

  if (data.user.role === "admin") {
  nav("/dashboard/admin");
} else if (data.user.role === "teacher") {
  nav("/dashboard/teacher");
} else if (data.user.role === "student") {
  nav("/dashboard/student");
} else if (data.user.role === "advisor") {
  nav("/dashboard/advisor");
} else {
  nav("/dashboard");
}
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in");
    } finally {
      setLoading(false);
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

          <button className="loginBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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