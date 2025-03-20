import React from "react";
import styles from "@/styles/admin/WelcomeBanner.module.css";

interface WelcomeBannerProps {
  adminName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ adminName }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.banner}>
      <div className={styles.textSection}>
        <p className={styles.date}>📅 {currentDate}</p>
        <h2 className={styles.welcomeText}>
          Welcome back, <span>{adminName || "Admin"}!</span>
        </h2>
        <p className={styles.subtitle}>Manage and monitor everything in your admin portal</p>
      </div>
      <div className={styles.imageSection}>
        <img src="/images/admin-dashboard.svg" alt="Admin Welcome Illustration" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
