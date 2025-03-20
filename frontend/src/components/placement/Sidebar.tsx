import React, { useEffect, useState } from "react";
import styles from "@/styles/placement/Sidebar.module.css";
import { useRouter } from "next/router";
import { FaUserGraduate, FaBriefcase, FaChartLine, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("/images/Profile.png"); // Default profile picture

  useEffect(() => {
    const fetchOfficerProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/placement/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("🟢 Placement Officer Data Fetched:", data);

        if (data.profilePicture) {
          setProfilePicture(`http://localhost:5000${data.profilePicture}?t=${new Date().getTime()}`);
        }
      } catch (error) {
        console.error("❌ Error fetching placement officer data:", error);
      }
    };

    fetchOfficerProfile();
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
          <li onClick={() => router.push("/placement/personalinfo")} style={{ cursor: "pointer" }}> 
                      <FaUser className={styles.icon} />
                      <span>Personal Info</span>
                    </li>
          <li onClick={() => router.push("/student-placements")} style={{ cursor: "pointer" }}>
            <FaUserGraduate className={styles.icon} />
            <span>Student Placements</span>
          </li>
          <li onClick={() => router.push("/company-collaborations")} style={{ cursor: "pointer" }}>
            <FaBriefcase className={styles.icon} />
            <span>Company Collaborations</span>
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
