import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoimg from "../logo.png";
import "../css/Navigation.css";

function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/register";

  if (hideNav) return null;

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`navigation ${open ? "show" : ""}`}>
        <div className="logo">
          <img src={logoimg} alt="Logo" />
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard">🏠 Dashboard</NavLink>
          <NavLink to="/interviewarena">⚔️ Interview Arena</NavLink>
          <NavLink to="/history">📜 History</NavLink>
          <NavLink to="/profile">👤 Profile</NavLink>
          <NavLink to="/logout" onClick={handleLogout}>🚪 Logout</NavLink>
        </div>
      </div>
    </>
  );
}

export default Navigation;