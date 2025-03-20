import React from "react";
import styles from "@/styles/recruiter/WelcomeBanner.module.css";

interface WelcomeBannerProps {
  recruiterName: string | null;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ recruiterName }) => {
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
          Welcome back, <span>{recruiterName || "Recruiter"}!</span>
        </h2>
        <p className={styles.subtitle}>Find and connect with top talent for your company</p>
      </div>
      <div className={styles.imageSection}>
        <img src="/images/recruiter-dashboard.svg" alt="Recruiter Welcome Illustration" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
