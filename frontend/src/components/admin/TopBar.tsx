import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/TopBar.module.css";
import { FaBell } from "react-icons/fa";

interface TopBarProps {
  adminName: string | null;
}

const TopBar: React.FC<TopBarProps> = ({ adminName }) => {
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

  return (
    <header className={styles.topBar}>
      {/* Search Bar */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search" />
      </div>

      {/* User Profile and Notifications */}
      <div className={styles.userSection}>
        <div className={styles.profile}>
          <img
            src={profilePicture}
            alt="Admin Profile"
            onError={() => setProfilePicture("/images/Profile.png")}
          />
          <div className={styles.userInfo}>
            <span className={styles.name}>{adminName || "Admin"}</span>
            <span className={styles.role}>Administrator</span>
          </div>
        </div>

        {/* Notification Icon */}
        <div className={styles.notification}>
          <FaBell className={styles.bellIcon} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
