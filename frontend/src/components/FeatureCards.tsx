import { useState } from "react";
import "../styles/FeatureCards.css"; // Ensure this file exists

// Define TypeScript interface for feature items
interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Feature data with proper typing
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
    <div className="feature-section">
      <h2 className="feature-heading">Why Choose Us?</h2>
      <div className="feature-container">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card ${activeIndex === index ? "active" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
