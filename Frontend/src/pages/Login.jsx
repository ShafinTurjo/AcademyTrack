import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const user = username.trim().toLowerCase();

    if (!user || !password.trim()) {
      alert("Username and password required");
      return;
    }

    if (user === "admin") {
      nav("/admin");
    } else if (user === "teacher") {
      nav("/teacher");
    } else if (user === "student") {
      nav("/student");
    } else if (user === "advisor") {
      nav("/advisor");
    } else {
      alert("User role not recognized");
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
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin / teacher / student / advisor"
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
            Demo login: admin / teacher / student / advisor
          </div>
        </form>
      </div>

      <div className="loginGlow"></div>
    </div>
  );
}