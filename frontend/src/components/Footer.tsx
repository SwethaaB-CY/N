import React from "react";
import "../styles/Footer.css"; // Ensure this file exists

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <p>Email: support@chiselyourself.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Chisel Yourself. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
