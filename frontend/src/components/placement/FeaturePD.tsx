import React from "react";
import styles from "@/styles/placement/FeaturePD.module.css";
import { FaUserGraduate, FaBriefcase, FaChartLine } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { icon: <FaUserGraduate size={40} color="#EE93BE" />, title: "Student Placements", desc: "Monitor placement activities" },
    { icon: <FaBriefcase size={40} color="#7FFFD4" />, title: "Company Collaborations", desc: "Manage company partnerships" },
    { icon: <FaChartLine size={40} color="#F68C1F" />, title: "Placement Reports", desc: "Generate and review statistics" }
  ];

  return (
    <div className={styles.featureContainer}>
      {features.map((feature, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;
