import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNavbar from "../components/Navbar";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import StructuredData from "../components/StructuredData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  useDocumentTitle(movie ? `${movie.Title} (${movie.Year}) - iBommaFlix` : "Loading... - iBommaFlix");

  const getVerdict = (rating) => {
    if (!rating || rating === "N/A") return "Rating unavailable";
    const imdbRating = parseFloat(rating);
    if (imdbRating < 5) return "Not worth watching";
    if (imdbRating <= 6.5) return "Average";
    if (imdbRating <= 8) return "Good to watch";
    return "Worth watching";
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const cacheKey = `movie_${title}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setMovie(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
        );
        if (res.data.Response === "True") {
          setMovie(res.data);
          localStorage.setItem(cacheKey, JSON.stringify(res.data));
        }
      } catch {
        // silently fail
      }
      setLoading(false);
    };

    fetchMovie();
  }, [title, OMDB_API_KEY]);

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  if (loading) {
    return (
      <div>
        <CustomNavbar />
        <div className="movie-details-loading">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <CustomNavbar />
        <div className="movie-details-loading">
          <p>Movie not found.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.Title,
    "image": movie.Poster,
    "datePublished": movie.Year,
    "director": { "@type": "Person", "name": movie.Director },
    "genre": movie.Genre,
    "description": movie.Plot,
    ...(movie.imdbRating && movie.imdbRating !== "N/A" ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": movie.imdbRating,
        "bestRating": "10",
        "worstRating": "1"
      }
    } : {})
  };

  return (
    <div>
      <StructuredData data={movieSchema} />
      <CustomNavbar />
      <div className="movie-details-container">
        {/* Top bar — back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>&#8592; Back</button>

        {/* Title section — full width like IMDb */}
        <div className="movie-header">
          <h1 className="movie-header-title">{movie.Title}</h1>
          <div className="movie-header-sub">
            <span>{movie.Year}</span>
            {movie.Rated && movie.Rated !== "N/A" && <span>{movie.Rated}</span>}
            {movie.Runtime && movie.Runtime !== "N/A" && <span>{movie.Runtime}</span>}
          </div>
        </div>

        {/* Main content — poster left, info right */}
        <div className="movie-details-content">
          <div className="movie-details-poster">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : posterPlaceholder}
              alt={movie.Title}
              onError={handleImgError}
            />
          </div>
          <div className="movie-details-info">
            {/* Genre tags */}
            <div className="movie-genre-tags">
              {movie.Genre && movie.Genre.split(",").map((g, i) => (
                <span key={i} className="genre-tag">{g.trim()}</span>
              ))}
            </div>

            {/* Rating box — IMDb style */}
            <div className="movie-rating-box">
              <div className="rating-star">&#9733;</div>
              <div className="rating-info">
                <span className="rating-score">{movie.imdbRating}</span>
                <span className="rating-out-of">/10</span>
              </div>
              <span className="rating-source">IMDb</span>
            </div>

            {/* Verdict */}
            <p className="movie-details-verdict">{getVerdict(movie.imdbRating)}</p>

            {/* Plot */}
            <p className="movie-plot">{movie.Plot}</p>

            {/* Details grid — IMDb style key-value pairs */}
            <div className="movie-info-grid">
              {movie.Director && movie.Director !== "N/A" && (
                <div className="info-row">
                  <span className="info-label">Director</span>
                  <span className="info-value">{movie.Director}</span>
                </div>
              )}
              {movie.Actors && movie.Actors !== "N/A" && (
                <div className="info-row">
                  <span className="info-label">Stars</span>
                  <span className="info-value">{movie.Actors}</span>
                </div>
              )}
              {movie.Language && movie.Language !== "N/A" && (
                <div className="info-row">
                  <span className="info-label">Language</span>
                  <span className="info-value">{movie.Language}</span>
                </div>
              )}
              {movie.Awards && movie.Awards !== "N/A" && (
                <div className="info-row">
                  <span className="info-label">Awards</span>
                  <span className="info-value">{movie.Awards}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <AdBanner adSlot="1122334455" />
      </div>
    </div>
  );
};

export default MovieDetails;
