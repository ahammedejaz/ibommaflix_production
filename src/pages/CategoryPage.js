import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNavbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import { fetchTrendingMovies } from "../services/tmdbApi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import MovieListSchema from "../components/MovieListSchema";
import "./CategoryPage.css";

const categoryLabels = {
  tollywood: "Tollywood",
  bollywood: "Bollywood",
  hollywood: "Hollywood",
};

const categoryDescriptions = {
  tollywood: {
    intro: "Tollywood, the Telugu-language film industry based in Hyderabad, has emerged as one of India's most dynamic and globally recognized cinema powerhouses. Known for its grand visual storytelling, high-octane action sequences, and emotionally resonant narratives, Telugu cinema consistently pushes the boundaries of Indian filmmaking.",
    detail: "From the record-breaking Baahubali franchise that introduced Indian cinema to global audiences, to the raw intensity of Pushpa and the patriotic fervor of RRR, Tollywood has proven its ability to create films that transcend language barriers. The industry boasts a rich talent pool including directors like S.S. Rajamouli and Sukumar, and stars like Jr. NTR, Ram Charan, Allu Arjun, and Mahesh Babu. Beyond blockbusters, Telugu cinema also excels in thought-provoking dramas, sharp comedies, and compelling thrillers. Browse the latest trending Telugu movies below, complete with IMDb ratings and our watchability verdicts."
  },
  bollywood: {
    intro: "Bollywood, the Hindi-language film industry headquartered in Mumbai, is the most prolific film industry in the world by number of films produced annually. For over a century, Hindi cinema has been the cultural heartbeat of India, blending music, dance, drama, and storytelling into a uniquely captivating art form.",
    detail: "From the golden era classics of Raj Kapoor and Guru Dutt to the modern masterstrokes of Rajkumar Hirani and Sanjay Leela Bhansali, Bollywood has continuously reinvented itself while staying true to its roots in emotional storytelling. The industry has given the world iconic stars like Shah Rukh Khan, Amitabh Bachchan, Aamir Khan, and Deepika Padukone. Today's Bollywood embraces diverse genres from gritty crime dramas and biographical epics to romantic comedies and social commentaries. Explore trending Hindi movies below with ratings, cast details, and plot summaries to find your next favorite film."
  },
  hollywood: {
    intro: "Hollywood, the American English-language film industry centered in Los Angeles, California, has been the global benchmark for cinema since the early twentieth century. With unmatched budgets, cutting-edge visual effects, and worldwide distribution networks, Hollywood productions reach audiences in virtually every country on earth.",
    detail: "The industry is home to the most iconic franchises in film history: Marvel, Star Wars, Harry Potter, James Bond, and The Lord of the Rings, among many others. Hollywood also leads in technical innovation, from pioneering CGI and motion capture to the rise of streaming-first releases. Beyond the spectacle, American cinema produces critically acclaimed dramas, indie gems, and documentaries that shape global conversations. Directors like Christopher Nolan, Denis Villeneuve, and Greta Gerwig continue to push creative boundaries. Discover the latest trending Hollywood releases below with comprehensive ratings and recommendations."
  }
};

const CategoryPage = () => {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const label = categoryLabels[type];
  useDocumentTitle(label ? `${label} Movies - iBommaFlix` : "Category - iBommaFlix");

  const fetchPage = useCallback(async (pageNum) => {
    if (!label) return;
    setLoading(true);

    const results = await fetchTrendingMovies(type, pageNum);

    if (results.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...results]);
      setPage(pageNum + 1);
    }
    setLoading(false);
  }, [type, label]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    if (label) {
      fetchPage(1);
    }
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  if (!label) {
    return (
      <div>
        <CustomNavbar />
        <div className="category-not-found">
          <p>Category not found.</p>
          <Link to="/" className="home-link">Go Home</Link>
        </div>
      </div>
    );
  }

  const pageTitle = `${label} Movies - Latest & Trending | iBommaFlix`;
  const pageDesc = `Browse the latest and trending ${label} movies. Discover ratings, reviews and recommendations on iBommaFlix.`;
  const canonicalUrl = `https://ibommaflix.com/category/${type}`;

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="iBommaFlix" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ibommaflix.com/" },
        { name: `${label} Movies`, url: canonicalUrl }
      ]} />
      <MovieListSchema
        movies={movies}
        categoryName={label}
        categoryUrl={canonicalUrl}
      />
      <CustomNavbar />
      <div className="category-container">
        <h1 className="category-page-title">{label} Movies</h1>
        {categoryDescriptions[type] && (
          <div className="category-description">
            <p className="category-description-intro">{categoryDescriptions[type].intro}</p>
            <p className="category-description-detail">{categoryDescriptions[type].detail}</p>
          </div>
        )}
        {movies.length === 0 && loading ? (
          <SkeletonCard count={8} layout="grid" />
        ) : null}
        <div className="category-grid">
          {movies.map((m, index) => (
            <React.Fragment key={m.id || index}>
              <Link to={`/movie/${encodeURIComponent(m.title)}`} className="category-card">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="category-card-img"
                  onError={handleImgError}
                  loading="lazy"
                  width={180}
                  height={270}
                />
                <div className="category-card-info">
                  <p className="category-card-title">{m.title}</p>
                  <p className="category-card-year">{m.year}</p>
                  {m.rating && m.rating !== "N/A" && (
                    <p className="category-card-rating">&#9733; {m.rating}</p>
                  )}
                </div>
              </Link>
              {/* Ad after every 8 cards */}
              {(index + 1) % 8 === 0 && (
                <div className="category-ad-slot">
                  <AdBanner adSlot="5304494924" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => fetchPage(page)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
        <div className="back-to-top-container">
          <button
            className="back-to-top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
