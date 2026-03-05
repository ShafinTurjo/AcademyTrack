import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";
export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    
    if (username && password) nav("/dashboard/students");
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 360, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <h2>Academy Track</h2>
        <p style={{ color: "#666", marginTop: -6 }}>Login to continue</p>

        <form onSubmit={handleLogin}>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            />
            <button style={{ padding: 10, borderRadius: 10, border: "none" }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}