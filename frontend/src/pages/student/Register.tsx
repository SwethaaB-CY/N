import React, { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css"; // Correct CSS module import
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter(); 
  const [certifications, setCertifications] = useState([{ id: Date.now(), name: "", description: "", link: "", file: null }]);
  const [achievements, setAchievements] = useState([{ id: Date.now(), event: "", description: "", link: "", file: null }]);
  const [projects, setProjects] = useState([{ id: Date.now(), title: "", description: "", link: "", file: null }]);
  const [semesters, setSemesters] = useState([{ id: Date.now(), semester: "", file: null }]);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Retrieve `id` from localStorage on page load
useEffect(() => {
  const storedId = localStorage.getItem("id"); // ✅ Use "id" instead of "userId"
  console.log("User ID from localStorage:", storedId);
  setUserId(storedId); // ✅ Set userId with the correct value
}, []);

  const handleAddMore = <T,>(setState: React.Dispatch<React.SetStateAction<T[]>>, data: T) => {
    setState((prev) => [...prev, { id: Date.now(), ...data }]);
  };

  const handleRemove = (setState: React.Dispatch<React.SetStateAction<any[]>>, id: number) => {
  setState((prev) => prev.filter((item) => item.id !== id));
};


  const [skills, setSkills] = useState<string[]>([]);
const [newSkill, setNewSkill] = useState("");

const handleAddSkill = () => {
  if (newSkill.trim() !== "") {
    setSkills([...skills, newSkill.trim()]);
    setNewSkill(""); // Clear input after adding
  }
};

const handleRemoveSkill = (index: number) => {
  setSkills(skills.filter((_, i) => i !== index));
};

const [socialLinks, setSocialLinks] = useState<{ id: number; platform: string; url: string }[]>([]);

// Function to Add More Social Links
const handleAddSocialLink = () => {
  setSocialLinks([...socialLinks, { id: Date.now(), platform: "", url: "" }]);
};

// Function to Remove a Specific Social Link
const handleRemoveSocialLink = (id: number) => {
  setSocialLinks(socialLinks.filter((link) => link.id !== id));
};

// Function to Update Social Link Fields
const handleSocialLinkChange = (id: number, field: "platform" | "url", value: string) => {
  setSocialLinks(
    socialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link))
  );
};


 // ✅ Fetch student details from backend
 const fetchStudentDetails = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/student-details/${id}`);
    if (!response.ok) throw new Error("Failed to fetch student details");

    const data = await response.json();
    console.log("Fetched Student Data:", data);
    setStudentData(data);
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
};

// ✅ Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userId) {
    alert("User not logged in! Please log in first.");
    return;
  }

  const formData = { 
    userId, 
    fullName: "John Doe", 
    email: "john@example.com",
    schoolName: "ABC High School",
    schoolAddress: "New York",
    tenthPercent: 85,
    twelfthPercent: 90,
    collegeName: "XYZ University",
    collegeAddress: "California",
    cgpa: 8.5,
    resumeFile: "resume.pdf",
    skills: ["JavaScript", "React", "Next.js"],
    projects: [
      { title: "Portfolio Website", description: "A personal website", link: "http://example.com" }
    ]
  };

  try {
    const response = await fetch("http://localhost:5000/student-details/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Successfully submitted.");
      fetchStudentDetails(userId); // ✅ Fetch data after submission
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("An error occurred. Please try again later.");
  }
};


  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.heading}>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
         <section className={styles.sectionHeading}>
          <h3>Basic Info</h3>
          <input type="text" className={styles.inputField} placeholder="Full Name" required />
          <input type="email" className={styles.inputField} placeholder="Email" required />
          <input type="tel" className={styles.inputField} placeholder="Phone" required />
          <input type="text" className={styles.inputField} placeholder="Address" required />
          <select className={styles.selectBox} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </section>

        {/* Education */}
         <section className={styles.sectionHeading}>
          <h3>Education</h3>
          <h3>School</h3>
          <input type="text" className={styles.inputField} placeholder="School Name with Address" required />
          <input type="number" className={styles.inputField} placeholder="10th % " required />
          <input type="number" className={styles.inputField} placeholder="12th % " required />
          <label className={styles.label}>10th Marksheet:</label>
<input type="file" className={styles.fileInput} required />
<label className={styles.label}>12th Marksheet:</label>
<input type="file" className={styles.fileInput} required />

<h3>College</h3>

          <input type="text" className={styles.inputField} placeholder="College Name with Address" required />
          <input type="text" className={styles.inputField} placeholder="Degree" required />
          <input type="text" className={styles.inputField} placeholder="Branch" required />
          <input type="number" className={styles.inputField} placeholder="CGPA" required />

          <h4 className={styles.semesterHeading}>Semester-wise Marksheet Upload</h4>
          {semesters.map((sem) => (
            <div key={sem.id} className={styles.dynamicField}>
              <input type="text" className={styles.inputField} placeholder="Semester No." required />
              <input type="file" required />
              <button type="button" className={styles.removeButton} onClick={() => handleRemove(setSemesters, sem.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className={styles.addMoreButton} onClick={() => handleAddMore(setSemesters, {
            semester: "", file: null,
            id: 0
          })}>Add More</button>
        </section>

        {/* Skills */}
<section className={styles.sectionHeading}>
  <h3>Skills</h3>
  <div className={styles.dynamicField}>
    <input
      type="text"
      className={styles.inputField}
      placeholder="Enter skill"
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
    />
    <button
      type="button"
      className={styles.addMoreButton}
      onClick={handleAddSkill}
      disabled={!newSkill.trim()} // Disable if empty
    >
      Add Skill
    </button>
  </div>

  {/* Display Added Skills */}
  <div className={styles.skillsContainer}>
    {skills.map((skill, index) => (
      <div key={index} className={styles.skillItem}>
        {skill}
        <button
          type="button"
          className={styles.removeButton}
          onClick={() => handleRemoveSkill(index)}
        >
          X
        </button>
      </div>
    ))}
  </div>
</section>


        {/* Certifications */}
           <section className={styles.sectionHeading}>
          <h3>Certifications</h3>
          {certifications.map((cert) => (
            <div key={cert.id} className={styles.dynamicField}>
              <input type="text" className={styles.inputField} placeholder="Certificate Name" required />
              <textarea className={styles.textArea} placeholder="Description"></textarea>

              <input type="text" className={styles.inputField} placeholder="Certificate Link" />
              <input type="file" />
              <button type="button" className={styles.removeButton} onClick={() => handleRemove(setCertifications, cert.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className={styles.addMoreButton} onClick={() => handleAddMore(setCertifications, {
            name: "", description: "", link: "", file: null,
            id: 0
          })}>Add More</button>
        </section>

        {/* Achievements */}
           <section className={styles.sectionHeading}>
          <h3>Achievements</h3>
          {achievements.map((ach) => (
            <div key={ach.id} className={styles.dynamicField}>
              <input type="text" className={styles.inputField} placeholder="Event Name" required />
              <textarea className={styles.textArea} placeholder="Description"></textarea>

              <input type="text" className={styles.inputField} placeholder="Certificate Link" />
              <input type="file" />
              <button type="button" className={styles.removeButton} onClick={() => handleRemove(setAchievements, ach.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className={styles.addMoreButton} onClick={() => handleAddMore(setAchievements, {
            event: "", description: "", link: "", file: null,
            id: 0
          })}>Add More</button>
        </section>

        {/* Resume */}
           <section className={styles.sectionHeading}>
          <h3>Resume</h3>
          <input type="file" required />
          <h3>Portfolio</h3>
          <input type="text" className={styles.inputField} placeholder="Portfolio Link" />

        </section>

        {/* Social Links */}
        <section className={styles.sectionHeading}>
  <h3>Social Links</h3>

  {socialLinks.map((link) => (
    <div key={link.id} className={styles.dynamicField}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Platform (e.g., LinkedIn, GitHub)"
        value={link.platform}
        onChange={(e) => handleSocialLinkChange(link.id, "platform", e.target.value)}
        required
      />
      <input
        type="text"
        className={styles.inputField}
        placeholder="Profile URL"
        value={link.url}
        onChange={(e) => handleSocialLinkChange(link.id, "url", e.target.value)}
        required
      />
      <button type="button" className={styles.removeButton} onClick={() => handleRemoveSocialLink(link.id)}>
        Remove
      </button>
    </div>
  ))}

  <button type="button" className={styles.addMoreButton} onClick={handleAddSocialLink}>
    Add More
  </button>
</section>


        {/* Project Links */}
           <section className={styles.sectionHeading}>
          <h3>Project Links</h3>
          {projects.map((proj) => (
            <div key={proj.id} className={styles.dynamicField}>
              <input type="text" className={styles.inputField} placeholder="Project Title" required />
              <textarea className={styles.textArea} placeholder="Description"></textarea>

              <input type="text" className={styles.inputField} placeholder="Project Link" />
              <input type="file" />
              <button type="button" className={styles.removeButton} onClick={() => handleRemove(setProjects, proj.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className={styles.addMoreButton} onClick={() => handleAddMore(setProjects, {
            title: "", description: "", link: "", file: null,
            id: 0
          })}>Add More</button>
        </section>

        {/* Additional Info */}
           <section className={styles.sectionHeading}>
          <h3>Additional Info</h3>
          <textarea className={styles.textArea} placeholder="Short Description About Yourself"></textarea>
          <input type="text" className={styles.inputField} placeholder="Interested Domain" />
          <input type="text" className={styles.inputField} placeholder="Desired Role" />
        </section>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Register;
function setStudentData(data: any) {
  throw new Error("Function not implemented.");
}

