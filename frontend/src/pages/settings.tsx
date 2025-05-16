import { useEffect, useState } from "react";
import styles from "../styles/student/Settings.module.css"; // Adjust the path as necessary

const Settings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className={styles["settings-container"]}>
      <h2>Settings</h2>
      <div className={styles["theme-toggle"]} onClick={toggleTheme}>
        <span className={styles["toggle-label"]}>Dark Mode</span>
        <input type="checkbox" className={styles["toggle-input"]} checked={theme === "dark"} readOnly />
      </div>
    </div>
  );
};

export default Settings;
