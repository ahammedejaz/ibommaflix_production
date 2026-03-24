import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import { fetchTrendingMovies } from "../services/tmdbApi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./CategoryPage.css";

const categoryLabels = {
  tollywood: "Tollywood",
  bollywood: "Bollywood",
  hollywood: "Hollywood",
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

  return (
    <div>
      <CustomNavbar />
      <div className="category-container">
        <h1 className="category-page-title">{label} Movies</h1>
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
