import React from "react";
import styles from "@/styles/student/FeatureSD.module.css";
import { FaTasks, FaFlag, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/router";

const FeatureSD: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (title: string) => {
    if (title === "Skill Assessment") {
      router.push("/student/skillAssessment");
    }
  };

  const features = [
    { icon: <FaTasks size={40} color="#EE93BE" />, title: "Track Applications", desc: "Check status" },
    { icon: <FaFlag size={40} color="#7FFFD4" />, title: "Skill Assessment", desc: "Take a test" },
    { icon: <FaFlag size={40} color="#7FFFD4" />, title: "Mock Interview", desc: "Take a mock" },
    { icon: <FaChartLine size={40} color="#F68C1F" />, title: "Career Progress", desc: "Check now" }
  ];

  return (
    <div className={styles.featureContainer}>
      {features.map((feature, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleNavigation(feature.title)}
          style={{ cursor: feature.title === "Skill Assessment" ? "pointer" : "default" }}
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
