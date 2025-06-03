import React from "react";
import Link from "next/link";
import styles from "@/styles/recruiter/FeatureRD.module.css";
import { FaTasks, FaFlag, FaChartLine } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { 
      icon: <FaTasks size={40} color="#EE93BE" />, 
      title: "Quick stats & insights", 
      desc: "Total applications, shortlisted, hired candidates",
      link: "https://v0-student-recruiter-matching.vercel.app/analytics"
    },
    { 
      icon: <FaFlag size={40} color="#7FFFD4" />, 
      title: "% of candidate matching required skills", 
      desc: "200",
      link: "https://v0-student-recruiter-matching.vercel.app/matches"
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