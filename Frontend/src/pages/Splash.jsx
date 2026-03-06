import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/splash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000); // 2 seconds splash
  }, []);

  return (
    <div className="splash-screen">
      <h1 className="splash-title">AUST</h1>
      <p className="splash-sub">Academy Track</p>
    </div>
  );
}