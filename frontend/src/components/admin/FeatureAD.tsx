import React from "react";
import Link from "next/link";
import styles from "@/styles/admin/FeatureAD.module.css";
import { FaClipboardList, FaChartBar, FaUserGraduate } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { 
      icon: <FaUserGraduate size={40} color="#EE93BE" />, 
      title: "Total count", 
      desc: "Students, Companies, Placements",
      link: "https://v0-student-recruiter-matching.vercel.app/"
    },
    { 
      icon: <FaClipboardList size={40} color="#7FFFD4" />, 
      title: "Active vacancies", 
      desc: "26",
      link: "https://v0-student-recruiter-matching.vercel.app/recruiters"
    }
  ];

  return (
    <div className={styles.featureContainer}>
      {features.map((feature, index) => (
        <Link href={feature.link} key={index} className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeatureCard;