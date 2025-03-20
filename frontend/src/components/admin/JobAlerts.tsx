import React from "react";
import styles from "@/styles/admin/FeatureCard.module.css";
import { FaUsers, FaClipboardList, FaChartBar } from "react-icons/fa"; // Icons for admin features

const FeatureCard = () => {
  const features = [
    {
      title: "Manage Users",
      description: "Add, edit, and manage all users.",
      icon: <FaUsers size={40} color="#333" />,
    },
    {
      title: "Job Postings",
      description: "Review and manage job postings.",
      icon: <FaClipboardList size={40} color="#333" />,
    },
    {
      title: "Reports & Analytics",
      description: "View system performance and user stats.",
      icon: <FaChartBar size={40} color="#333" />,
    },
  ];

  return (
    <div className={styles.featureCard}>
      <div className={styles.header}>
        <h2>Admin Features</h2>
      </div>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.featureInfo}>
              {feature.icon}
              <div>
                <p className={styles.featureTitle}>{feature.title}</p>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
