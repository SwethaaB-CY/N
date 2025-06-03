import React, { useEffect, useState } from "react";
import styles from "@/styles/recruiter/Sidebar.module.css";
import { useRouter } from "next/router";
import { FaUsers, FaBriefcase, FaClipboardList, FaCog, FaSignOutAlt, FaUser, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("/images/Profile.png"); // Default profile picture

  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/recruiter/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("🟢 Recruiter Data Fetched:", data);

        if (data.profilePicture) {
          setProfilePicture(`http://localhost:5000${data.profilePicture}?t=${new Date().getTime()}`);
        }
      } catch (error) {
        console.error("❌ Error fetching recruiter data:", error);
      }
    };

    fetchRecruiterProfile();
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
        <li onClick={() => router.push("/recruiter/personalinfo")} style={{ cursor: "pointer" }}> 
            <FaUser className={styles.icon} />
            <span>Personal Info</span>
          </li>
          <li onClick={() => router.push("https://v0-student-recruiter-matching.vercel.app/students")} style={{ cursor: "pointer" }}> 
            <FaUser className={styles.icon} />
            <span>Candidate Profile</span>
          </li>
          <li onClick={() => router.push("https://v0-student-recruiter-matching.vercel.app/analytics")} style={{ cursor: "pointer" }}>
            <FaClipboardList className={styles.icon} />
            <span>Job & Assessment Management</span>
          </li>
          <li onClick={() => router.push("https://v0-fork-of-calendar-app-1e.vercel.app/")} style={{ cursor: "pointer" }}>
            <FaCalendarCheck className={styles.icon} />
            <span>Interview Schedule</span>
          </li>
          <li onClick={() => router.push("https://v0-ai-dashboard-beta.vercel.app/")} style={{ cursor: "pointer" }}>
            <FaChartLine className={styles.icon} />
            <span>Candidate Management & Tracking</span>
          </li>
          <li onClick={() => router.push("https://v0-student-recruiter-matching.vercel.app/recruiters")} style={{ cursor: "pointer" }}>
            <FaBriefcase className={styles.icon} />
            <span>Company Profile</span>
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