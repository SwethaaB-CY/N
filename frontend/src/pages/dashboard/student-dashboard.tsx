import React, { useEffect, useState } from "react";
import Sidebar from "../../components/student/Sidebar";
import TopBar from "../../components/student/TopBar";
import styles from "../../styles/StudentDashboard.module.css";
import WelcomeBanner from "@/components/student/WelcomeBanner";
import FeatureSD from "@/components/student/FeatureSD";
import JobAlerts from "@/components/student/JobAlerts";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const response = await fetch("http://localhost:5000/student/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure JWT token is included
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStudentName(data.fullName);
      } catch (error) {
        console.error("Error fetching student name:", error);
        setStudentName(null); // Fallback value
      } finally {
        setLoading(false);
      }
    };

    fetchStudentName();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar studentName={loading ? "Loading..." : studentName} />
        <WelcomeBanner studentName={loading ? "Loading..." : studentName} />

        {/* New Flex Container for Feature Cards & Job Alerts */}
        <div className={styles.dashboardContent}>
          <FeatureSD />
        </div>
        
        <JobAlerts />
      </div>
    </div>
  );
};

export default StudentDashboard;
