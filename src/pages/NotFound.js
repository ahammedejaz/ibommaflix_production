import React from "react";
import { Link } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./NotFound.css";

const NotFound = () => {
  useDocumentTitle("Page Not Found - iBommaFlix");
  return (
    <div>
      <CustomNavbar />
      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-text">The page you're looking for doesn't exist.</p>
        <Link to="/" className="notfound-btn">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
