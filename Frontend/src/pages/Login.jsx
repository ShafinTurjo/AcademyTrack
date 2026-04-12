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
<<<<<<< Updated upstream

<<<<<<< HEAD
=======
>>>>>>> Stashed changes
=======
    console.log("Login button clicked");

>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
    if (!username.trim() || !password.trim()) {
      alert("Email and password required");
      return;
    }
<<<<<<< Updated upstream

<<<<<<< HEAD
=======
    setLoading(true);
>>>>>>> Stashed changes
=======
    setLoading(true);

>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
    try {
      // API URL localhost এর বদলে 127.0.0.1 দিলে অনেক সময় ব্রাউজার ইস্যু সমাধান হয়
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });
<<<<<<< Updated upstream

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Login response:", data);

=======
      const data = await res.json();
>>>>>>> Stashed changes
      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }
<<<<<<< Updated upstream

<<<<<<< HEAD
=======
      const role = data.user?.role?.trim().toLowerCase();
>>>>>>> Stashed changes
=======
      const role = data.user?.role?.trim().toLowerCase();

>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", role);

<<<<<<< HEAD
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
=======
      // আপনার App.jsx এর Route অনুযায়ী redirection logic
      if (role === "student") {
        nav("/dashboard/student");
      } else if (role === "teacher") {
        // App.jsx এ path="teacher" দেওয়া আছে, তাই এখানে /dashboard/teacher হবে
        nav("/dashboard/teacher"); 
      } else if (role === "admin") {
        nav("/dashboard/students");
      } else if (role === "advisor") {
        nav("/dashboard/advisor");
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
      } else {
        alert("User role not recognized: " + data.user?.role);
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
<<<<<<< Updated upstream

<<<<<<< HEAD
          <button className="loginBtn" type="submit">
            Login
=======
          <button className="loginBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
>>>>>>> Stashed changes
=======
          <button className="loginBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
>>>>>>> 129083f9fea8fe2659475650d44a9c2b2c1cb1ef
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