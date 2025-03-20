import React from "react";
import styles from "@/styles/admin/FeatureAD.module.css";
import { FaClipboardList, FaChartBar, FaUserGraduate } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { icon: <FaUserGraduate size={40} color="#EE93BE" />, title: "Total count", desc: "Students, Companies, Placements" },
    { icon: <FaClipboardList size={40} color="#7FFFD4" />, title: "Active vacancies", desc: "200" },
    { icon: <FaChartBar size={40} color="#F68C1F" />, title: "Student growing", desc: "Heat maps" }
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
