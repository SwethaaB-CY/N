import Link from "next/link";
import { JSX, useState, useEffect } from "react";
import "../styles/Navbar.css";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    window.location.reload(); // Reload to reflect changes
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="logo">
        <Link href="/">LOGO</Link>
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Center: Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
