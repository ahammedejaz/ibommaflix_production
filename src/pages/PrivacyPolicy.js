import React from "react";
import { Helmet } from "react-helmet-async";
import CustomNavbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Legal.css";

const PrivacyPolicy = () => {
  useDocumentTitle("Privacy Policy - iBommaFlix");
  return (
    <div>
      <Helmet>
        <title>Privacy Policy - iBommaFlix</title>
        <meta name="description" content="Read iBommaFlix's privacy policy. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://ibommaflix.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - iBommaFlix" />
        <meta property="og:description" content="Read iBommaFlix's privacy policy." />
        <meta property="og:url" content="https://ibommaflix.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="iBommaFlix" />
      </Helmet>
      <CustomNavbar />
      <div className="legal-container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: March 2026</p>

        <section className="legal-section">
          <h2>Introduction</h2>
          <p>
            Welcome to iBommaFlix ("we," "our," or "us"). We respect your privacy and are committed to
            protecting any information collected while you use our website. This Privacy Policy explains
            what information we collect, how we use it, and your rights regarding that information.
          </p>
        </section>

        <section className="legal-section">
          <h2>What We Do</h2>
          <p>
            iBommaFlix is a movie discovery and rating aggregation platform. We do not host, stream,
            or distribute any movies or copyrighted video content. Our service consolidates publicly
            available movie ratings and metadata from the OMDb API to help users determine the
            watchability of movies across Tollywood, Bollywood, and Hollywood industries.
          </p>
        </section>

        <section className="legal-section">
          <h2>Information We Collect</h2>
          <p>We collect minimal information to provide our service:</p>
          <ul>
            <li><strong>Local Storage Data:</strong> We cache movie search results in your browser's
              local storage to improve performance and reduce API calls. This data stays on your
              device and is never transmitted to our servers.</li>
            <li><strong>Contact Form Data:</strong> If you use our contact form, the information you
              provide (name, email, message) is sent directly via your email client. We do not store
              this data on any server.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Cookies and Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense may use
            cookies and web beacons to serve ads based on your prior visits to our website or other
            websites on the internet. Google's use of advertising cookies enables it and its partners
            to serve ads based on your visit to our site and/or other sites on the internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>. Alternatively, you may opt out of third-party vendor cookies by visiting{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              www.aboutads.info/choices
            </a>.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          <p>Our website uses the following third-party services:</p>
          <ul>
            <li><strong>OMDb API:</strong> To fetch movie metadata, ratings, and poster images.
              We do not control the data provided by OMDb.</li>
            <li><strong>Google AdSense:</strong> To display advertisements. Google may collect data
              as described in their{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Data Security</h2>
          <p>
            Since we do not collect or store personal data on any server, there is minimal risk of
            data breach from our end. All movie data caching happens locally in your browser.
          </p>
        </section>

        <section className="legal-section">
          <h2>Children's Privacy</h2>
          <p>
            Our website is not directed at children under the age of 13. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
