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
      // Preserve original logic from first code
      router.push({
        pathname: "/quiz",
        query: { token },
      });
    } else if (title === "Coding Challenge") {
      window.location.href = "https://v0-next-js-coding-platform-dun.vercel.app/";
    } else if (title === "Roadmap Generation") {
      window.location.href = "https://v0-new-project-srg6ehkl2tq.vercel.app/";
    } else if (title === "Analytical Dasboard") {
      window.location.href = "https://v0-ai-dashboard-blue.vercel.app/";
    } else if (title === "Mock Interview") {
      window.location.href = "https://v0-mock-interview-app-pi.vercel.app/";
    }
  };

  const features = [
    { icon: <FaTools size={35} color="#FF6347" />, title: "Skills", desc: "Manage skills" },
    { icon: <FaFlag size={35} color="#7FFFD4" />, title: "Skill Assessment", desc: "Take a test" },
    { icon: <FaFlag size={35} color="#7FFFD4" />, title: "Coding Challenge", desc: "Take a challenge" },
    { icon: <FaFlag size={35} color="#7FFFD4" />, title: "Mock Interview", desc: "Take a Moc" },
    { icon: <FaTasks size={35} color="#EE93BE" />, title: "Roadmap Generation", desc: "Generate now" },
    { icon: <FaChartLine size={35} color="#F68C1F" />, title: "Analytical Dasboard", desc: "Check now" }
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
              ["Skill Assessment", "Mock Interview", "Skills", "Coding Challenge", "Roadmap Generation", "Analytical Dasboard"].includes(feature.title)
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
