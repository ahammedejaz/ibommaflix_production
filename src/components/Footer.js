"use client";
import React from "react";
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/category/tollywood">Tollywood</Link>
        <Link href="/category/bollywood">Bollywood</Link>
        <Link href="/category/hollywood">Hollywood</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-legal">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/disclaimer">Disclaimer</Link>
      </div>
      <p>&copy; 2026 🎬iBommaFlix. All Rights Reserved.</p>
      <p className="footer-credit">Powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a></p>
    </footer>
  );
};

export default Footer;
