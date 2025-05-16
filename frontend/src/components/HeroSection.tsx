import { useState, useEffect } from "react";
import Image from "next/image";
import AuthCard from "./AuthCard"; // Assuming AuthCard is in the same folder
import "../styles/hero.module.css";

const images: string[] = [
  "/images/success.jpg",
  "/images/career.jpg",
  "/images/learning.jpg",
  "/images/happiness.jpg",
  "/images/achievement.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {/* Left Side */}
      <div className="hero-left">
        <h1 className="welcome-text">
          Welcome, <span className="student-name">Student_Name</span>
        </h1>
        <p className="hero-caption">
          Empower your career with the best learning resources and mentorship.
        </p>
        <button className="cta-btn" onClick={() => setShowAuthCard(true)}>
          Get Started
        </button>
      </div>

      {/* Right Side - Carousel */}
      <div className="hero-right">
        {/* Glassmorphism Card */}
        <div className="glass-card"></div>

        <div className="carousel">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-image ${index === currentIndex ? "active" : ""}`}
            >
              <Image src={src} alt="Career Growth" width={350} height={350} />
            </div>
          ))}
        </div>
      </div>

      {/* Show AuthCard Modal */}
      {showAuthCard && <AuthCard closeAuth={() => setShowAuthCard(false)} />}
    </div>
  );
}
