import React, { useEffect, useState } from "react";
import Sidebar from "../../components/recruiter/Sidebar";
import Topbar from "../../components/recruiter/TopBar";
import styles from "../../styles/RecruiterDashboard.module.css";
import WelcomeBanner from "@/components/recruiter/WelcomeBanner";
import JobListings from "@/components/recruiter/FeatureRD"; // Different from FeatureSD

const RecruiterDashboard = () => {
  const [recruiterName, setRecruiterName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecruiterName = async () => {
      try {
        const response = await fetch("http://localhost:5000/recruiter/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setRecruiterName(data.fullName);
      } catch (error) {
        console.error("Error fetching recruiter name:", error);
        setRecruiterName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterName();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar recruiterName={loading ? "Loading..." : recruiterName} />
        <WelcomeBanner recruiterName={loading ? "Loading..." : recruiterName} />
        <div className={styles.dashboardContent}>
          <JobListings />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
