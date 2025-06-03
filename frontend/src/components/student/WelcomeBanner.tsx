import React from "react";
import styles from "@/styles/student/WelcomeBanner.module.css";

interface WelcomeBannerProps {
  studentName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ studentName }) => {
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
          Welcome back, <span>{studentName || "Student"}!</span>
        </h2>
        <p className={styles.subtitle}>Always stay updated in your student portal</p>
      </div>
      <div className={styles.imageSection}>
  <a href="https://v0-ginee.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="/images/image.png" alt="GENIE" className={styles.roundImage} />
  </a>
</div>
    </div>
  );
};

export default WelcomeBanner;