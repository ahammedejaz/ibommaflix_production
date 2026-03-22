import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CustomNavbar from "../components/Navbar";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./CategoryPage.css";

const categoryMap = {
  tollywood: { label: "Tollywood", movies: tollywoodMovies },
  bollywood: { label: "Bollywood", movies: bollywoodMovies },
  hollywood: { label: "Hollywood", movies: hollywoodMovies },
};

const BATCH_SIZE = 20;

const CategoryPage = () => {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const category = categoryMap[type];
  useDocumentTitle(category ? `${category.label} Movies - iBommaFlix` : "Category - iBommaFlix");

  const fetchBatch = useCallback(async (startIndex) => {
    if (!category) return;
    setLoading(true);

    const titles = category.movies.slice(startIndex, startIndex + BATCH_SIZE);
    const results = [];

    const requests = titles.map((title) =>
      axios
        .get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`)
        .catch(() => null)
    );

    const responses = await Promise.all(requests);

    responses.forEach((res) => {
      if (res && res.data && res.data.Response === "True") {
        results.push({
          title: res.data.Title,
          year: res.data.Year,
          poster: res.data.Poster,
          imdbRating: res.data.imdbRating,
        });
      }
    });

    setMovies((prev) => [...prev, ...results]);
    setLoadedCount(startIndex + BATCH_SIZE);
    setLoading(false);
  }, [category, OMDB_API_KEY]);

  useEffect(() => {
    setMovies([]);
    setLoadedCount(0);
    if (category) {
      fetchBatch(0);
    }
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  if (!category) {
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

  const hasMore = loadedCount < category.movies.length;

  return (
    <div>
      <CustomNavbar />
      <div className="category-container">
        <h1 className="category-page-title">{category.label} Movies</h1>
        <div className="category-grid">
          {movies.map((m, index) => (
            <React.Fragment key={index}>
              <Link to={`/movie/${encodeURIComponent(m.title)}`} className="category-card">
                <img
                  src={m.poster !== "N/A" ? m.poster : posterPlaceholder}
                  alt={m.title}
                  className="category-card-img"
                  onError={handleImgError}
                  loading="lazy"
                />
                <div className="category-card-info">
                  <p className="category-card-title">{m.title}</p>
                  <p className="category-card-year">{m.year}</p>
                  {m.imdbRating && m.imdbRating !== "N/A" && (
                    <p className="category-card-rating">&#9733; {m.imdbRating}</p>
                  )}
                </div>
              </Link>
              {/* Ad after every 8 cards */}
              {(index + 1) % 8 === 0 && (
                <div className="category-ad-slot">
                  <AdBanner adSlot="5566778899" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => fetchBatch(loadedCount)}
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
