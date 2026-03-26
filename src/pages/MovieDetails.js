import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import CustomNavbar from "../components/Navbar";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import StructuredData from "../components/StructuredData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { searchMovieByTitle, fetchMovieTrailers, fetchSimilarMovies, getTmdbMovieId } from "../services/tmdbApi";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null);
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
      setMovie(null);
      setLoading(true);
      setTrailers([]);
      setSimilarMovies([]);
      setActiveTrailer(null);

      // Try localStorage cache first
      const cacheKey = `movie_${title}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          setMovie(JSON.parse(cachedData));
          setLoading(false);
          return;
        } catch { /* corrupted cache, continue */ }
      }

      // Try OMDb first (more reliable, works across regions)
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`,
          { timeout: 8000 }
        );
        if (res.data.Response === "True") {
          setMovie(res.data);
          localStorage.setItem(cacheKey, JSON.stringify(res.data));
          setLoading(false);
          return;
        }
      } catch {
        // OMDb failed, try TMDB
      }

      // Fallback to TMDB
      const tmdbMovie = await searchMovieByTitle(title);
      if (tmdbMovie) {
        setMovie(tmdbMovie);
        localStorage.setItem(cacheKey, JSON.stringify(tmdbMovie));
      }

      setLoading(false);
    };

    fetchMovie();
  }, [title, OMDB_API_KEY]);

  // Fetch trailers and similar movies after movie loads
  useEffect(() => {
    if (!movie || !movie.Title) return;

    const fetchExtras = async () => {
      try {
        let tmdbId = movie.source === "tmdb" ? movie.id : null;
        if (!tmdbId) {
          tmdbId = await getTmdbMovieId(movie.Title);
        }

        if (tmdbId) {
          const [trailersData, similarData] = await Promise.all([
            fetchMovieTrailers(tmdbId),
            fetchSimilarMovies(tmdbId),
          ]);

          setTrailers(trailersData);
          if (trailersData.length > 0) {
            setActiveTrailer(trailersData[0]);
          }
          setSimilarMovies(similarData);
        }
      } catch {
        // Trailers and similar movies are non-critical
      }
    };

    fetchExtras();
  }, [movie]);

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
        <Helmet>
          <title>Movie Not Found - iBommaFlix</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <CustomNavbar />
        <div className="movie-details-loading">
          <h2 style={{ color: "#FFD700", marginBottom: "10px" }}>Movie Not Found</h2>
          <p style={{ color: "#999", marginBottom: "20px" }}>
            Sorry, we couldn't find "{decodeURIComponent(title)}" in our database.
            <br />Try searching with a different spelling or check the movie title.
          </p>
          <button className="back-btn" onClick={() => navigate(-1)}>&#8592; Go Back</button>
        </div>
      </div>
    );
  }

  const pageTitle = `${movie.Title} (${movie.Year}) - Rating & Review | iBommaFlix`;
  const pageDesc = `${movie.Title} - IMDb Rating: ${movie.imdbRating || "N/A"}. ${movie.Plot ? movie.Plot.substring(0, 150) : "Discover ratings, cast, and plot details on iBommaFlix."}`;
  const canonicalUrl = `https://ibommaflix.com/movie/${encodeURIComponent(title)}`;

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.Title,
    "url": canonicalUrl,
    "image": movie.Poster && movie.Poster !== "N/A" ? movie.Poster : undefined,
    "datePublished": movie.Year,
    "description": movie.Plot && movie.Plot !== "N/A" ? movie.Plot : undefined,
    "genre": movie.Genre && movie.Genre !== "N/A" ? movie.Genre.split(",").map(g => g.trim()) : undefined,
    "director": movie.Director && movie.Director !== "N/A"
      ? movie.Director.split(",").map(d => ({ "@type": "Person", "name": d.trim() }))
      : undefined,
    "actor": movie.Actors && movie.Actors !== "N/A"
      ? movie.Actors.split(",").map(a => ({ "@type": "Person", "name": a.trim() }))
      : undefined,
    ...(movie.imdbRating && movie.imdbRating !== "N/A" ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": movie.imdbRating,
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": movie.imdbVotes ? movie.imdbVotes.replace(/,/g, "") : "1000"
      }
    } : {})
  };

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:site_name" content="iBommaFlix" />
        {movie.Poster && movie.Poster !== "N/A" && (
          <meta property="og:image" content={movie.Poster} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>
      <StructuredData data={movieSchema} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ibommaflix.com/" },
        { name: "Movies", url: "https://ibommaflix.com/" },
        { name: movie.Title, url: canonicalUrl }
      ]} />
      <CustomNavbar />
      <div className="movie-details-container">
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
              alt={`${movie.Title} movie poster`}
              onError={handleImgError}
              width={300}
              height={450}
            />
          </div>
          <div className="movie-details-info">
            {/* Genre tags */}
            <div className="movie-genre-tags">
              {movie.Genre && movie.Genre.split(",").map((g, i) => (
                <span key={i} className="genre-tag">{g.trim()}</span>
              ))}
            </div>

            {/* Rating + Verdict — left aligned below genre */}
            <div className="movie-rating-section">
              <div className="movie-rating-box">
                <div className="rating-star">&#9733;</div>
                <div className="rating-info">
                  <span className="rating-score">{movie.imdbRating}</span>
                  <span className="rating-out-of">/10</span>
                </div>
                <span className="rating-source">{movie.source === "tmdb" ? "TMDB" : "IMDb"}</span>
              </div>
              <p className="movie-details-verdict">{getVerdict(movie.imdbRating)}</p>
            </div>

            {/* Plot */}
            <p className="movie-plot">{movie.Plot}</p>

            {/* Details grid */}
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

        <AdBanner adSlot="6617576595" />

        {/* Trailer Section */}
        {activeTrailer && (
          <div className="trailer-section">
            <h2 className="section-title">Watch Trailer</h2>
            <div className="trailer-container">
              <iframe
                className="trailer-iframe"
                src={`https://www.youtube.com/embed/${activeTrailer.key}?rel=0&modestbranding=1`}
                title={`${movie.Title} - ${activeTrailer.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {trailers.length > 1 && (
              <div className="trailer-tabs">
                {trailers.slice(0, 4).map((trailer) => (
                  <button
                    key={trailer.key}
                    className={`trailer-tab ${activeTrailer.key === trailer.key ? "active" : ""}`}
                    onClick={() => setActiveTrailer(trailer)}
                  >
                    {trailer.type}: {trailer.name.length > 30 ? trailer.name.substring(0, 30) + "..." : trailer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="similar-movies-section">
            <h2 className="section-title">Similar Movies You Might Like</h2>
            <div className="similar-movies-grid">
              {similarMovies.map((m) => (
                <div
                  key={m.id}
                  className="similar-movie-card"
                  onClick={() => navigate(`/movie/${encodeURIComponent(m.title)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={m.poster}
                    alt={`${m.title} poster`}
                    className="similar-movie-poster"
                    loading="lazy"
                    width={150}
                    height={225}
                  />
                  <div className="similar-movie-info">
                    <p className="similar-movie-title">{m.title}</p>
                    <div className="similar-movie-meta">
                      {m.year && <span>{m.year}</span>}
                      {m.rating !== "N/A" && <span className="similar-movie-rating">&#9733; {m.rating}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
