import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/Sidebar.module.css";
import { useRouter } from "next/router";
import { FaUser, FaUsers, FaBriefcase, FaChartLine, FaBrain, FaShieldAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("/images/Profile.png"); // Default profile picture

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("🟢 Admin Data Fetched:", data);

        if (data.profilePicture) {
          setProfilePicture(`http://localhost:5000${data.profilePicture}?t=${new Date().getTime()}`);
        }
      } catch (error) {
        console.error("❌ Error fetching admin data:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    await router.push("/"); // Ensure navigation before full reload
    window.location.reload(); // Force a full refresh to reset state
  };

  return (
    <aside className={styles.sidebar}>
      {/* Profile Logo */}
      <div className={styles.profile}>
        <img src={profilePicture} alt="Profile" onError={() => setProfilePicture("/images/Profile.png")} />
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => router.push("/admin/personalinfo")} style={{ cursor: "pointer" }}> 
            <FaUser className={styles.icon} />
            <span>Personal Info</span>
          </li>
          <li onClick={() => router.push("/student-management")} style={{ cursor: "pointer" }}>
            <FaUsers className={styles.icon} />
            <span>Student Management</span>
          </li>
          <li onClick={() => router.push("/company-management")} style={{ cursor: "pointer" }}>
            <FaBriefcase className={styles.icon} />
            <span>Company Management</span>
          </li>
          <li onClick={() => router.push("/placement-tracking")} style={{ cursor: "pointer" }}>
            <FaChartLine className={styles.icon} />
            <span>Placement Tracking</span>
          </li>
          <li onClick={() => router.push("/analytics-insights")} style={{ cursor: "pointer" }}>
            <FaChartLine className={styles.icon} />
            <span>Analytics Insights</span>
          </li>
          
          <li onClick={() => router.push("/security-logs")} style={{ cursor: "pointer" }}>
            <FaShieldAlt className={styles.icon} />
            <span>Security & Compliance Logs</span>
          </li>
          <li onClick={() => router.push("/settings")} style={{ cursor: "pointer" }}>
            <FaCog className={styles.icon} />
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className={styles.logout} onClick={handleLogout} style={{ cursor: "pointer" }}>
        <FaSignOutAlt className={styles.icon} />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
