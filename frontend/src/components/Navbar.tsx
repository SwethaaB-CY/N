import Link from "next/link";
import { useState, useEffect } from "react";
import "../styles/Navbar.module.css";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dashboardPath, setDashboardPath] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      if (token) {
        setIsLoggedIn(true);
        setDashboardPath(getDashboardPath(userType));
      }
    }
  }, []);

  const getDashboardPath = (userType: string | null): string => {
    switch (userType?.toLowerCase()) {
      case "student":
        return "/dashboard/student-dashboard";
      case "admin":
        return "/dashboard/admin-dashboard";
      case "recruiter":
        return "/dashboard/recruiter-dashboard";
      case "placement officer":
        return "/dashboard/placement-dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setDashboardPath("");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">LOGO</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link href={dashboardPath} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </li>
        )}

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
