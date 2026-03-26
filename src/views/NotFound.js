"use client";
import React from "react";
import Link from "next/link";
import CustomNavbar from "../components/Navbar";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-text">The page you're looking for doesn't exist.</p>
        <Link href="/" className="notfound-btn">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
