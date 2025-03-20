import React from "react";
import styles from "@/styles/placement/WelcomeBanner.module.css";

interface WelcomeBannerProps {
  officerName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ officerName }) => {
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
          Welcome back, <span>{officerName || "Placement Officer"}!</span>
        </h2>
        <p className={styles.subtitle}>Manage placements and student career opportunities</p>
      </div>
      <div className={styles.imageSection}>
        <img src="/images/placement-dashboard.svg" alt="Placement Officer Welcome Illustration" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
