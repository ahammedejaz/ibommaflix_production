import React from "react";
import { Helmet } from "react-helmet-async";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Legal.css";

const TermsOfService = () => {
  useDocumentTitle("Terms of Service - iBommaFlix");
  return (
    <div>
      <Helmet>
        <title>Terms of Service - iBommaFlix</title>
        <meta name="description" content="Read the terms of service for using iBommaFlix movie discovery platform." />
        <link rel="canonical" href="https://ibommaflix.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service - iBommaFlix" />
        <meta property="og:description" content="Read the terms of service for using iBommaFlix." />
        <meta property="og:url" content="https://ibommaflix.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="iBommaFlix" />
      </Helmet>
      <CustomNavbar />
      <div className="legal-container">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: March 2026</p>

        <section className="legal-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using iBommaFlix, you agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section className="legal-section">
          <h2>Description of Service</h2>
          <p>
            iBommaFlix is a free movie discovery and rating aggregation platform. We consolidate
            publicly available movie ratings and metadata to help users assess the watchability of
            movies across Tollywood, Bollywood, and Hollywood industries.
          </p>
          <p>
            <strong>We do not host, stream, distribute, or provide access to any movies,
            video content, or copyrighted material.</strong> All movie data displayed on our
            platform (including posters, ratings, plot summaries, and other metadata) is sourced
            from the OMDb API, a publicly available movie database.
          </p>
        </section>

        <section className="legal-section">
          <h2>User Conduct</h2>
          <p>When using iBommaFlix, you agree not to:</p>
          <ul>
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to access, scrape, or interfere with our website's infrastructure</li>
            <li>Misrepresent our service as a movie streaming or download platform</li>
            <li>Use automated tools to excessively query our website</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            The iBommaFlix brand, logo, and website design are our intellectual property.
            Movie posters, titles, ratings, and metadata are the property of their respective
            owners and are displayed under fair use for informational and review purposes via
            the OMDb API.
          </p>
        </section>

        <section className="legal-section">
          <h2>Disclaimer of Warranties</h2>
          <p>
            iBommaFlix is provided "as is" without warranties of any kind. We do not guarantee
            the accuracy, completeness, or reliability of movie ratings, verdicts, or any other
            information displayed on our platform. Movie ratings are sourced from IMDb via the
            OMDb API and may change over time.
          </p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            iBommaFlix shall not be liable for any direct, indirect, incidental, or consequential
            damages arising from your use of the website. Our verdict system ("Worth watching,"
            "Good to watch," "Average," "Not worth watching") is an automated interpretation of
            IMDb ratings and should not be considered professional film criticism.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Links and Services</h2>
          <p>
            Our website may display content from third-party services (OMDb API, Google AdSense).
            We are not responsible for the content, privacy practices, or terms of these third-party
            services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Continued use of
            the website after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, please visit our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
