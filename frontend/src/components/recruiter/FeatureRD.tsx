import React from "react";
import styles from "@/styles/recruiter/FeatureRD.module.css";
import { FaTasks, FaFlag, FaChartLine } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { icon: <FaTasks size={40} color="#EE93BE" />, title: "Quick stats & insights", desc: "Total applications, shortlisted, hired candidates" },
    { icon: <FaFlag size={40} color="#7FFFD4" />, title: "% of candidate matching required skills", desc: "200" },
    { icon: <FaChartLine size={40} color="#F68C1F" />, title: "Diversity & inclusion filters", desc: "Work experience" }
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
