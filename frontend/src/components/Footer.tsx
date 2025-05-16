import React from "react";
import styles from "../styles/Footer.module.css"; // Correct CSS module import

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerContent}>
        {/* Quick Links */}
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerList}>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Contact Us</h3>
          <p>Email: <a href="mailto:support@chiselyourself.com">support@chiselyourself.com</a></p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} <strong>Chisel Yourself</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
