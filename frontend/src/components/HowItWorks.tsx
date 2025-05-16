import React, { JSX } from "react";
import "../styles/HowItWorks.module.css"; // Ensure this file exists

// Define the type for each step
interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: "Build Your Profile",
    description: "Sign up and create your personalized profile. Add your skills, certifications, and career preferences.",
    icon: "📝",
  },
  {
    title: "Discover Your Skill Gaps",
    description: "Our platform analyzes your profile and identifies skill gaps based on market demands.",
    icon: "🔍",
  },
  {
    title: "Follow Your Training Path",
    description: "Receive tailored training programs to address your skill gaps. Track your progress and earn certifications.",
    icon: "🛤️",
  },
  {
    title: "Get Matched with Dream Jobs",
    description: "Our AI algorithms analyze job descriptions and match you with companies that align with your skills and goals.",
    icon: "🤖",
  },
  {
    title: "Monitor Your Growth",
    description: "Track your skill development, certifications, and readiness for the job market in real-time.",
    icon: "📊",
  },
  {
    title: "Achieve Your Goals",
    description: "With improved skills and personalized guidance, you’ll be ready to land your dream job and kickstart your career.",
    icon: "🎯",
  },
];

export default function HowItWorks(): JSX.Element {
  return (
    <div className="how-it-works-section">
      <h2 className="how-it-works-heading">How It Works: Your Path to Success</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-wrapper">
            <div className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
