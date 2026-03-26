import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/category/tollywood">Tollywood</Link>
        <Link to="/category/bollywood">Bollywood</Link>
        <Link to="/category/hollywood">Hollywood</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer-legal">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </div>
      <p>&copy; 2026 🎬iBommaFlix. All Rights Reserved.</p>
      <p className="footer-credit">Powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a></p>
    </footer>
  );
};

export default Footer;
