"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomNavbar from "../components/Navbar";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import { searchMovieByTitle, fetchMovieTrailers, fetchSimilarMovies, getTmdbMovieId } from "../services/tmdbApi";
import "./MovieDetails.css";

const MovieDetails = ({ titleParam, initialMovie = null }) => {
  const title = titleParam;
  const router = useRouter();
  const [movie, setMovie] = useState(initialMovie);
  const [loading, setLoading] = useState(!initialMovie);
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const getVerdict = (rating) => {
    if (!rating || rating === "N/A") return "Rating unavailable";
    const imdbRating = parseFloat(rating);
    if (imdbRating < 5) return "Not worth watching";
    if (imdbRating <= 6.5) return "Average";
    if (imdbRating <= 8) return "Good to watch";
    return "Worth watching";
  };

  const getEditorialSnippet = (movieData) => {
    if (!movieData) return null;
    const rating = parseFloat(movieData.imdbRating);
    const year = parseInt(movieData.Year, 10);
    const genres = movieData.Genre && movieData.Genre !== "N/A" ? movieData.Genre.split(",").map(g => g.trim()) : [];
    const director = movieData.Director && movieData.Director !== "N/A" ? movieData.Director : null;
    const actors = movieData.Actors && movieData.Actors !== "N/A" ? movieData.Actors.split(",").map(a => a.trim()) : [];
    const leadActor = actors[0] || null;
    const awards = movieData.Awards && movieData.Awards !== "N/A" ? movieData.Awards : "";
    const runtime = parseInt(movieData.Runtime, 10);
    const language = movieData.Language && movieData.Language !== "N/A" ? movieData.Language.split(",")[0].trim() : null;
    const rated = movieData.Rated && movieData.Rated !== "N/A" ? movieData.Rated : null;
    const currentYear = new Date().getFullYear();

    const parts = [];

    // Opening — varied based on multiple factors
    const hasOscar = awards.toLowerCase().includes("oscar") || awards.toLowerCase().includes("academy award");
    if (hasOscar) {
      parts.push(`An Academy Award-recognized film, ${movieData.Title} stands as one of the most critically celebrated titles in our catalog.`);
    } else if (year >= currentYear - 1) {
      parts.push(`One of the freshest additions to iBommaFlix, ${movieData.Title} (${movieData.Year}) arrives with considerable buzz from audiences and critics alike.`);
    } else if (year < 1990) {
      parts.push(`A classic from ${movieData.Year}, ${movieData.Title} remains a defining work of its era and continues to influence filmmakers today.`);
    } else if (year < 2010) {
      parts.push(`Released in ${movieData.Year}, ${movieData.Title} has earned its place as a modern classic that viewers return to time and again.`);
    } else if (rating >= 7.5) {
      parts.push(`${movieData.Title} (${movieData.Year}) has established itself as a standout ${genres[0] || "film"} that consistently earns praise from both audiences and critics.`);
    } else {
      parts.push(`${movieData.Title} (${movieData.Year}) is a ${genres[0] || ""} film that offers a distinct perspective within its genre.`);
    }

    // Rating analysis — specific and opinionated
    if (isNaN(rating)) {
      parts.push("Rating information is not yet available for this title.");
    } else if (rating >= 8.5) {
      parts.push(`Its exceptional ${movieData.imdbRating}/10 IMDb rating places it in the top tier of all films on our platform — a rare achievement that signals near-universal acclaim.`);
    } else if (rating >= 7.5) {
      parts.push(`With a strong ${movieData.imdbRating}/10 on IMDb, the film delivers on its promises and is well worth your time, particularly if ${genres.slice(0, 2).join(" or ") || "quality cinema"} appeals to you.`);
    } else if (rating >= 6) {
      parts.push(`Its ${movieData.imdbRating}/10 IMDb score reflects a film that has its strengths but may not land equally with all viewers — worth checking out if the premise interests you.`);
    } else if (rating >= 4) {
      parts.push(`At ${movieData.imdbRating}/10 on IMDb, this one divided audiences. It has its defenders, but you may want to read the plot summary before committing your evening.`);
    } else {
      parts.push(`Rated ${movieData.imdbRating}/10 on IMDb, this is one for completists only. Most viewers will find better options in our catalog.`);
    }

    // Director/actor note
    if (director && leadActor) {
      parts.push(`Directed by ${director} and led by ${leadActor}, the film brings together talent that shapes its distinctive identity.`);
    } else if (director) {
      parts.push(`Under ${director}'s direction, the film carries a clear creative vision throughout.`);
    } else if (leadActor) {
      parts.push(`${leadActor} anchors the film with a performance that defines its emotional center.`);
    }

    // Runtime/content advisory
    if (runtime > 160) {
      parts.push(`At ${movieData.Runtime}, this is a lengthy watch — settle in with snacks and clear your schedule.`);
    } else if (runtime > 0 && runtime < 95) {
      parts.push(`With a lean ${movieData.Runtime} runtime, it does not waste a single minute getting its story across.`);
    }

    // Language note for non-English films
    if (language && language !== "English") {
      parts.push(`Presented in ${language}, the film is part of a rich cinematic tradition that iBommaFlix is proud to feature alongside global releases.`);
    }

    // Content rating advisory
    if (rated === "R" || rated === "A") {
      parts.push("Note: this film carries a mature content rating and is intended for adult audiences.");
    } else if (rated === "G" || rated === "PG" || rated === "U") {
      parts.push("This is a family-friendly title suitable for viewers of all ages.");
    }

    return parts.join(" ");
  };

  useEffect(() => {
    // If server pre-fetched this movie, skip client fetch
    if (initialMovie) return;

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
  }, [title, OMDB_API_KEY, initialMovie]);

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
        <CustomNavbar />
        <div className="movie-details-loading">
          <h2 style={{ color: "#FFD700", marginBottom: "10px" }}>Movie Not Found</h2>
          <p style={{ color: "#999", marginBottom: "20px" }}>
            Sorry, we couldn't find "{decodeURIComponent(title)}" in our database.
            <br />Try searching with a different spelling or check the movie title.
          </p>
          <button className="back-btn" onClick={() => router.back()}>&#8592; Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <div className="movie-details-container">
        <button className="back-btn" onClick={() => router.back()}>&#8592; Back</button>

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

            {/* Editorial Analysis */}
            {getEditorialSnippet(movie) && (
              <div className="movie-editorial">
                <h3 className="movie-editorial-title">iBommaFlix Verdict</h3>
                <p className="movie-editorial-text">{getEditorialSnippet(movie)}</p>
              </div>
            )}
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
                  onClick={() => router.push(`/movie/${encodeURIComponent(m.title)}`)}
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
