import React from "react";
import { Helmet } from "react-helmet-async";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./About.css";

const About = () => {
  useDocumentTitle("About - iBommaFlix");
  return (
    <div>
      <Helmet>
        <title>About iBommaFlix - Your Movie Discovery Platform</title>
        <meta name="description" content="Learn about iBommaFlix - your ultimate destination for discovering Telugu, Hindi and English movies with ratings, reviews and recommendations." />
        <link rel="canonical" href="https://ibommaflix.com/about" />
        <meta property="og:title" content="About iBommaFlix - Your Movie Discovery Platform" />
        <meta property="og:description" content="Learn about iBommaFlix - your ultimate destination for discovering Telugu, Hindi and English movies with ratings, reviews and recommendations." />
        <meta property="og:url" content="https://ibommaflix.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="iBommaFlix" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About iBommaFlix" />
        <meta name="twitter:description" content="Your ultimate destination for discovering Telugu, Hindi and English movies." />
      </Helmet>
      <CustomNavbar />
      <div className="about-container">
        <h1 className="about-title">About iBommaFlix</h1>
        <div className="about-content">
          <p>
            iBommaFlix is your go-to destination for discovering movies across Tollywood, Bollywood,
            and Hollywood. Browse trending titles, search for your favorites, and get instant
            ratings and verdicts to help you decide what to watch next.
          </p>
          <p>
            We bring together movie data from across industries so you never have to search
            multiple platforms again. Whether you're looking for the latest Telugu blockbuster,
            a Bollywood classic, or a Hollywood hit — it's all here in one place.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <h3>Discover</h3>
              <p>Browse curated collections from three major film industries.</p>
            </div>
            <div className="about-feature">
              <h3>Search</h3>
              <p>Find any movie instantly with our powerful search.</p>
            </div>
            <div className="about-feature">
              <h3>Decide</h3>
              <p>Get IMDb ratings and verdicts to pick the perfect movie.</p>
            </div>
          </div>
          <p className="about-credits">
            Movie data powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
