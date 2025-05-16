import { useState } from "react";
import styles from "../styles/FeatureCards.module.css"; // Correct import for CSS Module

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "AI Resume Scoring",
    description: "Get instant AI-driven feedback on your resume, improving structure, keywords, and impact.",
    icon: "🚀",
  },
  {
    title: "Career Growth",
    description: "Receive personalized career advice, mentorship, and insights to accelerate your professional journey.",
    icon: "📈",
  },
  {
    title: "Project-Based Learning",
    description: "Work on real-world projects to gain practical experience and build an impressive portfolio.",
    icon: "💡",
  },
  {
    title: "24/7 Support",
    description: "Get round-the-clock assistance from mentors, industry experts, and a supportive peer community.",
    icon: "🛠️",
  },
  {
    title: "AI Job Matching",
    description: "Find the perfect job opportunities based on your skills, experience, and career goals with AI-powered suggestions.",
    icon: "🤖",
  },
  {
    title: "AI Mock Interview",
    description: "Practice interviews with AI-generated questions and receive instant feedback to refine your responses.",
    icon: "🎤",
  },
  {
    title: "Career Progress Tracking",
    description: "Monitor your career growth, skill development, and milestones to stay on the right path.",
    icon: "📊",
  },
];

const FeatureCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.featureSection}>
      <h2 className={styles.featureHeading}>Why Choose Us?</h2>
      <div className={styles.featureContainer}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.featureCard} ${activeIndex === index ? styles.active : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
