import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const email = params.get("email");
  const token = params.get("token");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE}/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email, token, password, password_confirmation: confirmation,
        }),
      });
      const data = await response.json();
      setMessage(data.message || (response.ok ? "Password updated" : "Reset failed"));
      if (response.ok) {
        setPassword("");
        setConfirmation("");
      }
    } catch {
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "5rem auto", padding: 24 }}>
      <h1>Set your password</h1>
      {!email || !token ? (
        <p>Invalid link. Contact your administrator or request a new password link.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>Account: {email}</p>
          <label>New password (12+ characters)
            <input type="password" minLength={12} required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>Confirm password
            <input type="password" minLength={12} required value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save password"}
          </button>
        </form>
      )}
      {message && <p role="status">{message}</p>}
      <Link to="/login">Return to login</Link>
    </main>
  );
}
