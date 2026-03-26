"use client";
import React from "react";
import CustomNavbar from "../components/Navbar";
import "./About.css";

const About = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="about-container">
        <h1 className="about-title">About iBommaFlix</h1>
        <div className="about-content">
          <section className="about-section">
            <h2 className="about-section-title">Our Story</h2>
            <p>
              iBommaFlix was born from a very specific frustration. You want to look up a Telugu movie &mdash; say, the latest
              Mahesh Babu release or a Pawan Kalyan classic you half-remember from childhood. So you open IMDb, where regional
              Indian cinema gets buried under layers of Hollywood-centric navigation. Then you check TMDB, which has a different
              rating scale and sometimes different metadata entirely. Then you end up scrolling through generic "Top 10 Telugu
              Movies You Must Watch" listicles written by people who clearly have not watched most of them. No single platform
              gave a clean, fast, honest answer for someone who watches across Tollywood, Bollywood, and Hollywood.
            </p>
            <p>
              That gap is what iBommaFlix exists to fill. One place where you can look up <em>Baahubali</em> and <em>Interstellar</em>
              and <em>Dangal</em> with the same depth of information and the same straightforward verdict system, without
              switching between three different apps or wading through SEO-stuffed blog posts.
            </p>
            <p>
              A note on the name: "iBomma" comes from the Telugu word <em>bomma</em>, which literally means "puppet" or "doll"
              but is colloquially used to mean "movie" in Andhra Pradesh and Telangana slang. If you grew up in those states,
              you have heard someone say "bomma baagundi" ("the movie was good") at least a thousand times. "Flix" connects it
              to the universal language of cinema. Put them together and you get a name that feels rooted in Telugu culture while
              speaking to movie lovers everywhere.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">Meet the Creator</h2>
            <p>
              iBommaFlix was built by <strong>Ejaz Ahammed</strong>, a software engineer based in India who spends an
              arguably unhealthy amount of time thinking about movies. As someone who grew up watching Chiranjeevi mass
              entertainers and Balakrishna action films in Telugu, Shah Rukh Khan blockbusters in Hindi, and Marvel movies
              in English, Ejaz never fit neatly into a single-language audience category. He built what he wished existed:
              a platform that treats a Trivikram Srinivas film with the same respect as a Christopher Nolan one.
            </p>
            <p>
              The platform is built on React 19, deployed on Vercel and Google Cloud, and is actively maintained as a
              solo project. Ejaz personally curates the catalog of 250+ titles spanning Telugu, Hindi, and English cinema,
              which means every movie on here was deliberately chosen &mdash; not scraped in bulk from a database dump.
              New titles are added regularly based on releases, trending interest, and audience requests.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">Data Sources</h2>
            <p>
              Reliable movie data is the backbone of everything iBommaFlix does. We pull from two industry-standard sources
              and cross-reference them to give you the most complete picture possible:
            </p>
            <p>
              <strong><a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a> (The Open Movie Database)</strong> &mdash;
              This is our primary data source. OMDb provides IMDb ratings, full cast and crew listings, plot summaries,
              awards data, box office numbers, and content ratings. When you see an IMDb score on iBommaFlix, it comes
              directly from OMDb's feed of the official IMDb database.
            </p>
            <p>
              <strong><a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a> (The Movie Database)</strong> &mdash;
              TMDB supplements our data with trending information, high-resolution poster artwork, trailer links, and
              similar movie recommendations. Its community-driven model means newer and more niche titles often have
              richer metadata here than anywhere else.
            </p>
            <p>
              Both sources are cross-referenced to ensure the most complete information for every title. When OMDb data
              is unavailable for a particular movie &mdash; which sometimes happens with very recent releases or smaller
              regional films &mdash; TMDB serves as a reliable fallback so you never hit a dead end.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">Our Verdict System</h2>
            <p>
              Not everyone wants to decode what a "6.8" means on a 10-point scale. Is that good? Is that mediocre? It
              depends on who you ask. So we built a verdict system that translates IMDb ratings into plain-language
              recommendations you can act on in seconds.
            </p>
            <p>
              We chose these thresholds after analyzing rating distributions across thousands of movies. An 8.0+ on IMDb
              means a film is in roughly the top 5% of all rated titles &mdash; that is genuinely exceptional, not just
              "good." A 6.5 sits right around the median for movies that most people would consider watchable. Below 5.0,
              you are in territory where even fans of the genre tend to be disappointed. Here is how it breaks down:
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
              The goal is not to be a gatekeeper. Plenty of movies rated below 5.0 are someone's guilty pleasure, and
              that is completely fine. The verdicts are a starting point for decision-making, especially when you are
              scrolling through hundreds of titles on a Friday night and just want something solid to watch.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section-title">What iBommaFlix is NOT</h2>
            <p>
              Let us be upfront about this, because it matters:
            </p>
            <div className="about-features">
              <div className="about-feature">
                <h3>Not a Streaming Service</h3>
                <p>We do not host, stream, or distribute any movie content. You will not find a "play" button here. iBommaFlix is purely an information and discovery platform that helps you decide what to watch and where to find it legally.</p>
              </div>
              <div className="about-feature">
                <h3>Not a Piracy Site</h3>
                <p>We are aware that the "iBomma" name has been associated with piracy domains in the past. iBommaFlix has absolutely no connection to those operations. We are a legitimate platform that sources data exclusively from licensed APIs and directs users to legal streaming services and theaters.</p>
              </div>
              <div className="about-feature">
                <h3>Not Behind a Paywall</h3>
                <p>iBommaFlix is completely free to use. The platform is supported by ads, which is how we keep the lights on without charging you a single rupee. No subscriptions, no premium tiers, no "sign up to see ratings" tricks.</p>
              </div>
            </div>
            <p>
              When you find a movie you want to watch on iBommaFlix, we encourage you to support the filmmakers by
              watching through legitimate streaming services like Netflix, Amazon Prime Video, Aha, Hotstar, or at
              your local theater. Great cinema deserves to be paid for.
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
