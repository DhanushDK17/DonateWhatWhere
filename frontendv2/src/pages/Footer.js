import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/" className="footer-logo">
          Donate What Where
        </Link>
        <div className="footer-links">
          <Link to="/about" className="footer-item">
            About
          </Link>
          <Link to="/support" className="footer-item">
            Support
          </Link>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} Donate What Where. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
