import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";

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
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">LOGO</Link>
      </div>

      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        role="button"
        aria-label="Toggle menu"
      >
        <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`}></div>
      </div>

      <ul className={`${styles["nav-links"]} ${menuOpen ? styles.active : ""}`}>
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link href={dashboardPath} onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
        )}

        <li>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button className={styles["logout-btn"]} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className={styles["login-btn"]} onClick={onLoginClick}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
