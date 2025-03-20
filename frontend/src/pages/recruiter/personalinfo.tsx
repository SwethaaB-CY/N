import React, { useState, useEffect } from "react";
import styles from "@/styles/recruiter/PersonalInfo.module.css";
import { FaEdit, FaSave, FaUpload, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const PersonalInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    role: "Recruiter", // Default role
    profilePicture: null as File | string | null, // Supports both file & URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await fetch("http://localhost:5000/recruiter/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile");
        }

        const data = await response.json();
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          companyName: data.companyName || "",
          role: data.role || "Recruiter",
          profilePicture: data.profilePicture || null,
        });

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file, // Store file for upload
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("companyName", formData.companyName);

      if (formData.profilePicture instanceof File) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch("http://localhost:5000/recruiter/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }, // No need for 'Content-Type' with FormData
        body: formDataToSend,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update recruiter information.");
      }

      // Ensure profile picture updates immediately
      setFormData((prevData) => ({
        ...prevData,
        ...responseData,
        profilePicture: responseData.profilePicture
          ? `http://localhost:5000${responseData.profilePicture}`
          : "/Profile.png",
      }));

      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error updating recruiter info:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recruiter Profile</h2>

      {successMessage && (
        <div className={styles.successAlert}>
          <FaCheckCircle /> {successMessage}
        </div>
      )}

      <div className={styles.profilePicContainer}>
        <label htmlFor="profilePicture">
          {formData.profilePicture ? (
            <img
              src={
                formData.profilePicture instanceof File
                  ? URL.createObjectURL(formData.profilePicture) // Show preview before upload
                  : formData.profilePicture
                  ? `http://localhost:5000${formData.profilePicture}` // Fetch from backend
                  : "/Profile.png" // Fallback image
              }
              alt="Profile"
              className={styles.profilePic}
              onError={(e) => (e.currentTarget.src = "/Profile.png")} // Fallback in case of error
            />
          ) : (
            <div className={styles.profilePlaceholder}>Upload Profile</div>
          )}
        </label>
        <input type="file" id="profilePicture" accept="image/*" onChange={handleFileChange} hidden />
        <button className={styles.uploadBtn}><FaUpload /> Upload</button>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} disabled={!isEditing} />
          {errors.fullName && <p className={styles.errorText}><FaExclamationCircle /> {errors.fullName}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
          {errors.email && <p className={styles.errorText}><FaExclamationCircle /> {errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={!isEditing} />
          {errors.phoneNumber && <p className={styles.errorText}><FaExclamationCircle /> {errors.phoneNumber}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} disabled={!isEditing} />
          {errors.companyName && <p className={styles.errorText}><FaExclamationCircle /> {errors.companyName}</p>}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.editBtn} onClick={() => setIsEditing(true)}><FaEdit /> Edit</button>
        <button className={styles.saveBtn} onClick={handleSave} disabled={!isEditing}><FaSave /> Save</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
