import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./NotFound.css";

const NotFound = () => {
  useDocumentTitle("Page Not Found - iBommaFlix");
  return (
    <div>
      <Helmet>
        <title>Page Not Found - iBommaFlix</title>
        <meta name="description" content="The page you are looking for does not exist. Return to iBommaFlix homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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
