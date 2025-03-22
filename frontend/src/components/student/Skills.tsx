import React, { useState, useEffect } from "react";
import styles from "@/styles/student/Skills.module.css";

interface Skill {
  name: string;
  level: string;
}

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/student/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSkills(data.student.skills || []);
        } else {
          console.error("Failed to fetch skills.");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const addSkill = () => {
    if (newSkill && selectedLevel) {
      setSkills([...skills, { name: newSkill, level: selectedLevel }]);
      setNewSkill("");
      setSelectedLevel("");
      setIsEdited(true);
    }
  };

  const editSkill = (index: number) => {
    setEditingIndex(index);
    setNewSkill(skills[index].name);
    setSelectedLevel(skills[index].level);
  };

  const updateSkill = () => {
    if (editingIndex !== null) {
      const updatedSkills = [...skills];
      updatedSkills[editingIndex] = { name: newSkill, level: selectedLevel };
      setSkills(updatedSkills);
      setEditingIndex(null);
      setNewSkill("");
      setSelectedLevel("");
      setIsEdited(true);
    }
  };

  const deleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
    setIsEdited(true);
  };

  const saveSkills = async () => {
    if (!isEdited) return;

    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:5000/student/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ skills }),
      });

      if (response.ok) {
        alert("Skills saved successfully!");
        setIsEdited(false);
      } else {
        alert("Failed to save skills. Please try again.");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Failed to save skills. Please try again.");
    }
    setIsSaving(false);
  };

  return (
    <div className={styles.skillsContainer}>
      <h2 className={styles.subHeading}>Skills</h2>

      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className={styles.input}
        />

        <div className={styles.radioGroup}>
          {skillLevels.map((level) => (
            <label key={level} className={styles.radioLabel}>
              <input
                type="radio"
                name="skillLevel"
                value={level}
                checked={selectedLevel === level}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              {level}
            </label>
          ))}
        </div>

        {editingIndex !== null ? (
          <button className={styles.updateButton} onClick={updateSkill}>
            Update Skill
          </button>
        ) : (
          <button className={styles.addButton} onClick={addSkill} disabled={!newSkill || !selectedLevel}>
            Add Skill
          </button>
        )}
      </div>

      <div className={styles.skillList}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillItem}>
            {editingIndex === index ? (
              <div className={styles.editingRow}>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className={styles.editInput}
                />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={styles.editSelect}
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <button className={styles.cancelButton} onClick={() => setEditingIndex(null)}>Cancel</button>
              </div>
            ) : (
              <span>{skill.name} - <strong>{skill.level}</strong></span>
            )}

            {editingIndex === index ? null : (
              <div className={styles.actionButtons}>
                <button className={styles.editButton} onClick={() => editSkill(index)}>Edit</button>
                <button className={styles.deleteButton} onClick={() => deleteSkill(index)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.saveButton} onClick={saveSkills} disabled={!isEdited || isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Skills;
