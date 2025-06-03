import React from "react";
import Link from "next/link";
import styles from "@/styles/placement/FeaturePD.module.css";
import { FaUserGraduate, FaBriefcase, FaChartLine } from "react-icons/fa";

const FeatureCard: React.FC = () => {
  const features = [
    { 
      icon: <FaUserGraduate size={40} color="#EE93BE" />, 
      title: "Student Placements", 
      desc: "Monitor placement activities",
      link: "https://v0-student-recruiter-matching.vercel.app/students"
    },
    { 
      icon: <FaBriefcase size={40} color="#7FFFD4" />, 
      title: "Company Collaborations", 
      desc: "Manage company partnerships",
      link: "https://v0-student-recruiter-matching.vercel.app/recruiters"
    },
    { 
      icon: <FaChartLine size={40} color="#F68C1F" />, 
      title: "Placement Reports", 
      desc: "Generate and review statistics",
      link: "https://v0-ai-dashboard-beta.vercel.app/"
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