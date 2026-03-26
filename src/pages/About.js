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
          <section className="about-section">
            <h2 className="about-section-title">Our Mission</h2>
            <p>
              iBommaFlix was created with a simple mission: to make movie discovery effortless for fans of Indian and international
              cinema. We believe that great movies should not be hard to find, regardless of the language they are made in. Our platform
              brings together Telugu, Hindi, and English films in one unified experience, helping you discover your next favorite movie
              without switching between multiple apps and websites.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">Meet the Creator</h2>
            <p>
              iBommaFlix was built by <strong>Ejaz Ahammed</strong>, a software engineer and lifelong movie enthusiast. Growing up watching
              Telugu, Hindi, and English films, Ejaz noticed that no single platform catered to audiences who enjoy movies across all
              three industries. Existing databases were either too broad and unfocused, or limited to a single language. iBommaFlix was
              born from this gap: a focused, clean, and fast movie discovery tool designed for the multilingual movie audience.
            </p>
            <p>
              Ejaz built iBommaFlix from the ground up using modern web technologies including React, Node.js, and cloud infrastructure.
              The platform is continuously improved based on user feedback and industry trends, with new features and titles added
              regularly.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">How It Works</h2>
            <p>
              iBommaFlix aggregates movie data from trusted, industry-standard sources including <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a> (The Open Movie Database)
              and <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a> (The Movie Database). These APIs provide comprehensive and regularly updated
              information including titles, release years, plot summaries, cast and crew details, poster artwork, IMDb ratings, and
              trailer links. We combine data from both sources to ensure the most complete and accurate information possible.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">Our Verdict System</h2>
            <p>
              Every movie on iBommaFlix features a watchability verdict that translates numeric ratings into plain-language recommendations.
              Our system uses the following thresholds based on IMDb scores:
            </p>
            <div className="verdict-grid">
              <div className="verdict-item">
                <span className="verdict-badge verdict-great">Worth watching</span>
                <span className="verdict-range">Rating above 8.0</span>
              </div>
              <div className="verdict-item">
                <span className="verdict-badge verdict-good">Good to watch</span>
                <span className="verdict-range">Rating 6.5 - 8.0</span>
              </div>
              <div className="verdict-item">
                <span className="verdict-badge verdict-avg">Average</span>
                <span className="verdict-range">Rating 5.0 - 6.5</span>
              </div>
              <div className="verdict-item">
                <span className="verdict-badge verdict-poor">Not worth watching</span>
                <span className="verdict-range">Rating below 5.0</span>
              </div>
            </div>
            <p>
              This system helps you make quick viewing decisions without needing to interpret numbers. It is especially useful when
              browsing through hundreds of titles and you want a fast, reliable recommendation.
            </p>
          </section>

          <div className="about-features">
            <div className="about-feature">
              <h3>Discover</h3>
              <p>Browse curated collections from three major film industries, updated with the latest trending titles.</p>
            </div>
            <div className="about-feature">
              <h3>Search</h3>
              <p>Find any movie instantly by name. Our search covers over 250 titles across Tollywood, Bollywood, and Hollywood.</p>
            </div>
            <div className="about-feature">
              <h3>Decide</h3>
              <p>Get IMDb ratings, trailers, cast details, and our watchability verdicts to pick the perfect movie every time.</p>
            </div>
          </div>

          <section className="about-section">
            <h2 className="about-section-title">Important Disclaimer</h2>
            <p>
              iBommaFlix is a movie discovery and information platform only. We do not host, stream, upload, download, or provide
              access to any movie content. All movie data, posters, and ratings displayed on this site are sourced from publicly
              available third-party APIs. For watching movies, please use legitimate streaming services and theaters.
            </p>
          </section>

          <p className="about-credits">
            Movie data powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a> and <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
