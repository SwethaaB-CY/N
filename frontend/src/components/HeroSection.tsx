import { useState, useEffect } from "react";
import Image from "next/image";
import AuthCard from "./AuthCard";
import styles from "../styles/hero.module.css";

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
    <div className={styles["hero-section"]}>
      {/* Left Side */}
      <div className={styles["hero-left"]}>
        <h1 className={styles["welcome-text"]}>
          Welcome, <span className={styles["student-name"]}>Student_Name</span>
        </h1>
        <p className={styles["hero-caption"]}>
          Empower your career with the best learning resources and mentorship.
        </p>
        <button className={styles["cta-btn"]} onClick={() => setShowAuthCard(true)}>
          Get Started
        </button>
      </div>

      {/* Right Side - Carousel */}
      <div className={styles["hero-right"]}>
        {/* Glassmorphism Card */}
        <div className={styles["glass-card"]}></div>

        <div className={styles["carousel"]}>
          {images.map((src, index) => (
            <div
              key={index}
              className={`${styles["carousel-image"]} ${index === currentIndex ? styles.active : ""}`}
            >
              <Image src={src} alt="Career Growth" width={350} height={350} />
            </div>
          ))}
        </div>

        {/* Crazy background shapes */}
        <div className={styles["crazy-shapes"]}></div>
      </div>

      {/* Show AuthCard Modal */}
      {showAuthCard && <AuthCard closeAuth={() => setShowAuthCard(false)} />}
    </div>
  );
}
