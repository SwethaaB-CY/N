import React from "react";
import styles from "@/styles/student/JobAlerts.module.css";
import { FaLaptopCode, FaChartPie } from "react-icons/fa"; // Icons for jobs

const JobAlerts = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Infosys",
      icon: <FaLaptopCode size={40} color="#333" />,
    },
    {
      title: "Data Analyst",
      company: "DevRev",
      icon: <FaChartPie size={40} color="#333" />,
    },
  ];

  return (
    <div className={styles.jobAlerts}>
      <div className={styles.header}>
        <h2>Job Alerts</h2>
        <a href="#" className={styles.seeAll}>
          See all
        </a>
      </div>
      <div className={styles.jobList}>
        {jobs.map((job, index) => (
          <div key={index} className={styles.jobCard}>
            <div className={styles.jobInfo}>
              {job.icon}
              <div>
                <p className={styles.jobTitle}>{job.title}</p>
                <p className={styles.company}>{job.company}</p>
              </div>
            </div>
            <button className={styles.viewButton}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobAlerts;
