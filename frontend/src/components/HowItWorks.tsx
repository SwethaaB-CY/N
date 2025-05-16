import React from "react";
import styles from "../styles/HowItWorks.module.css";

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

export default function HowItWorks() {
  const shapeClasses = [styles.stepCircle, styles.stepHexagon, styles.stepRectangle];

  return (
    <div className={styles.howItWorksSection}>
      <h2 className={styles.howItWorksHeading}>How It Works: Your Path to Success</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => {
          const shapeClass = shapeClasses[index % shapeClasses.length];
          return (
            <div key={index} className={styles.stepWrapper}>
              <div className={`${styles.stepCard} ${shapeClass}`}>
                <div className={styles.stepIcon}>{step.icon}</div>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
