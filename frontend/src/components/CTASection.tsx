import React, { useState } from "react";
import AuthCard from "./AuthCard"; // Import AuthCard component
import "../styles/CTASection.css"; // Ensure this file exists

const CTASection: React.FC = () => {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);

  // Function to handle showing the AuthCard
  const handleGetStartedClick = (): void => {
    setShowAuthCard(true);
  };

  return (
    <div className="cta-section">
      <h2 className="cta-heading">Ready to Shape Your Future?</h2>
      <p className="cta-description">
        Join thousands of students who have transformed their careers with Chisel Yourself. Sign up today and take the first step toward your dream job!
      </p>
      <div className="cta-buttons">
        <button className="cta-button primary" onClick={handleGetStartedClick}>
          Get Started
        </button>
        <button className="cta-button secondary">Learn More</button>
      </div>

      {/* Show AuthCard when showAuthCard state is true */}
      {showAuthCard && <AuthCard closeAuth={() => setShowAuthCard(false)} />}
    </div>
  );
};

export default CTASection;
