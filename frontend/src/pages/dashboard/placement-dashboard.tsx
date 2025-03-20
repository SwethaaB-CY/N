import React, { useEffect, useState } from "react";
import Sidebar from "../../components/placement/Sidebar";
import Topbar from "../../components/placement/TopBar";
import styles from "../../styles/PlacementDashboard.module.css";
import WelcomeBanner from "@/components/placement/WelcomeBanner";
import PlacementStats from "@/components/placement/FeaturePD"; // Different from FeatureSD

const PlacementDashboard = () => {
  const [officerName, setOfficerName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOfficerName = async () => {
      try {
        const response = await fetch("http://localhost:5000/placement/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setOfficerName(data.fullName);
      } catch (error) {
        console.error("Error fetching placement officer name:", error);
        setOfficerName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficerName();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar officerName={loading ? "Loading..." : officerName} />
        <WelcomeBanner officerName={loading ? "Loading..." : officerName} />
        <div className={styles.dashboardContent}>
          <PlacementStats />
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
