import React from "react";
import Skills from "@/components/student/Skills";
import styles from "@/styles/student/SkillAssessment.module.css";

const SkillAssessment: React.FC = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>Skill Assessment</h1>
      <p className={styles.description}>Add your skills and select your expertise level.</p>

      {/* Skills Component */}
      <Skills />
    </div>
  );
};

export default SkillAssessment;
