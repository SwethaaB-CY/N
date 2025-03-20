import React, { useEffect, useState } from "react";
import styles from "@/styles/student/Sidebar.module.css"; 
import { useRouter } from "next/router"; 
import { FaUser, FaFileAlt, FaComment, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("/images/Profile.png"); // Default profile picture

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/student/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("🟢 Student Data Fetched:", data);

        if (data.profilePicture) {
          setProfilePicture(`http://localhost:5000${data.profilePicture}?t=${new Date().getTime()}`);
        }
      } catch (error) {
        console.error("❌ Error fetching student data:", error);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    await router.push("/"); // Ensure it navigates first
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
          <li onClick={() => router.push("/student/personalinfo")} style={{ cursor: "pointer" }}> 
            <FaUser className={styles.icon} />
            <span>Personal Info</span>
          </li>
          <li onClick={() => router.push("/student/Register")} style={{ cursor: "pointer" }}> 
            <FaUser className={styles.icon} />
            <span>Student Details</span>
          </li>
          <li onClick={() => window.open("http://localhost:3001", "_blank")} style={{ cursor: "pointer" }}>
              <FaFileAlt className={styles.icon} />
              <span>AI Resume Generator</span>
          </li>


          

          <li>
            <FaComment className={styles.icon} />
            <span>Feedback</span>
          </li>
          <li onClick={() => router.push("/settings")} style={{ cursor: "pointer" }}> 
  <FaCog className={styles.icon} />
  <span>Settings</span>
</li>
          <li>
            <FaQuestionCircle className={styles.icon} />
            <span>Help?</span>
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
