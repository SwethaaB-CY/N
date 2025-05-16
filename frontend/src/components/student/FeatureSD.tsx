import React from "react";
import styles from "@/styles/student/FeatureSD.module.css";
import { FaTasks, FaFlag, FaChartLine, FaTools } from "react-icons/fa";
import { useRouter } from "next/router";

const FeatureSD: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (title: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to access this feature.");
      return;
    }

    if (title === "Skills") {
      router.push("/student/skill");
    } else if (title === "Skill Assessment") {
      window.location.href = `http://localhost:3001?token=${token}`;
    } else if (title === "Mock Interview") {
      window.location.href = `http://localhost:3002?token=${token}`;
    }
  };

  const features = [
    { icon: <FaTasks size={35} color="#EE93BE" />, title: "Track Applications", desc: "Check status" },
    { icon: <FaFlag size={35} color="#7FFFD4" />, title: "Skill Assessment", desc: "Take a test" },
    { icon: <FaFlag size={35} color="#7FFFD4" />, title: "Mock Interview", desc: "Take a mock" },
    { icon: <FaChartLine size={35} color="#F68C1F" />, title: "Career Progress", desc: "Check now" },
    { icon: <FaTools size={35} color="#FF6347" />, title: "Skills", desc: "Manage skills" }
  ];

  return (
    <div className={styles.featureContainer}>
      {features.map((feature, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleNavigation(feature.title)}
          style={{
            cursor:
              feature.title === "Skill Assessment" ||
              feature.title === "Mock Interview" ||
              feature.title === "Skills"
                ? "pointer"
                : "default"
          }}
          aria-label={`Feature: ${feature.title}`}
        >
          <div className={styles.icon}>{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSD;
