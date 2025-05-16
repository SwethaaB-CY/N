import React, { useState } from "react";
import AuthCard from "./AuthCard"; // Import AuthCard component
import styles from "../styles/CTASection.module.css"; // Import as module

const CTASection: React.FC = () => {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);

  const handleGetStartedClick = (): void => {
    setShowAuthCard(true);
  };

  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaHeading}>Ready to Shape Your Future?</h2>
      <p className={styles.ctaDescription}>
        Join thousands of students who have transformed their careers with Chisel Yourself. Sign up today and take the first step toward your dream job!
      </p>
      <div className={styles.ctaButtons}>
        <button className={`${styles.ctaButton} ${styles.primary}`} onClick={handleGetStartedClick}>
          Get Started
        </button>
        <button className={`${styles.ctaButton} ${styles.secondary}`}>
          Learn More
        </button>
      </div>

      {showAuthCard && <AuthCard closeAuth={() => setShowAuthCard(false)} />}
    </div>
  );
};

export default CTASection;
