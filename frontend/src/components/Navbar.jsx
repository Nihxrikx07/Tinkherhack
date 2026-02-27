import React from "react";
import { Link } from "react-router-dom";
import "./../styles/globals.css";

export default function Navbar({ user }) {
  return (
    <nav className="navbar glassmorphic">
      <div className="logo">🍽 SaveTheServe</div>
      <ul className="nav-links">
        <li><Link to="/user">User</Link></li>
        <li><Link to="/hotel">Hotel</Link></li>
        {user ? (
          <li><button>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}