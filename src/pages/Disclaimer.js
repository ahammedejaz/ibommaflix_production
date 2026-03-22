import React from "react";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Legal.css";

const Disclaimer = () => {
  useDocumentTitle("Disclaimer - iBommaFlix");
  return (
    <div>
      <CustomNavbar />
      <div className="legal-container">
        <h1 className="legal-title">Disclaimer</h1>
        <p className="legal-updated">Last updated: March 2026</p>

        <section className="legal-section">
          <h2>No Movie Hosting or Streaming</h2>
          <p>
            iBommaFlix is strictly a movie discovery and rating aggregation platform.
            <strong> We do not host, stream, upload, download, distribute, or provide access
            to any movies, TV shows, or copyrighted video content whatsoever.</strong>
          </p>
          <p>
            Our platform displays publicly available movie metadata — including titles, posters,
            ratings, plot summaries, and other information — sourced entirely from the OMDb API
            (Open Movie Database). We act solely as an informational service to help users assess
            the watchability of movies based on consolidated ratings.
          </p>
        </section>

        <section className="legal-section">
          <h2>Rating Verdicts</h2>
          <p>
            Our watchability verdicts ("Worth watching," "Good to watch," "Average,"
            "Not worth watching") are automatically generated based on IMDb ratings and are
            intended for informational purposes only. These verdicts represent an algorithmic
            interpretation of publicly available rating data and do not constitute professional
            film criticism or personal recommendations.
          </p>
          <p>Verdict mapping:</p>
          <ul>
            <li>IMDb rating above 8.0 — "Worth watching"</li>
            <li>IMDb rating 6.5 to 8.0 — "Good to watch"</li>
            <li>IMDb rating 5.0 to 6.5 — "Average"</li>
            <li>IMDb rating below 5.0 — "Not worth watching"</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Third-Party Content and Data</h2>
          <p>
            All movie data displayed on iBommaFlix is sourced from the OMDb API. Movie posters,
            titles, ratings, and other metadata are the property of their respective copyright
            holders. We display this information under fair use principles for the purpose of
            commentary, review, and informational aggregation.
          </p>
          <p>
            We do not claim ownership of any movie-related content displayed on our platform.
            If you are a copyright holder and believe any content should be removed, please
            contact us through our <a href="/contact">Contact page</a>.
          </p>
        </section>

        <section className="legal-section">
          <h2>Accuracy of Information</h2>
          <p>
            While we strive to display accurate and up-to-date information, we cannot guarantee
            the accuracy of data provided by third-party APIs. Movie ratings, release years,
            and other details may change over time and may not always reflect the most current
            information.
          </p>
        </section>

        <section className="legal-section">
          <h2>Advertisements</h2>
          <p>
            iBommaFlix displays advertisements through Google AdSense. The advertisements shown
            on our site are served by Google and are not endorsed by iBommaFlix. We are not
            responsible for the content of any advertisements or the products/services they promote.
          </p>
        </section>

        <section className="legal-section">
          <h2>External Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the
            content, privacy policies, or practices of any third-party websites.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>
            If you have any concerns or questions regarding this disclaimer, please reach out
            via our <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
