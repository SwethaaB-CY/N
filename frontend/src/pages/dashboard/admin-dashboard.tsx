import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "@/components/admin/TopBar";
import styles from "../../styles/AdminDashboard.module.css";
import WelcomeBanner from "@/components/admin/WelcomeBanner";
import FeatureCard from "@/components/admin/FeatureAD"; // Renamed from FeatureSD

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setAdminName(data.fullName);
      } catch (error) {
        console.error("Error fetching admin name:", error);
        setAdminName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar adminName={loading ? "Loading..." : adminName} />
        <WelcomeBanner adminName={loading ? "Loading..." : adminName} />
        <div className={styles.dashboardContent}>
          <FeatureCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
