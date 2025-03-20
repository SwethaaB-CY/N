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
        <img src="/images/SD image.svg" alt="Welcome Illustration" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
