import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import { fetchTrendingMovies } from "../services/tmdbApi";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import StructuredData from "../components/StructuredData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Home.css";

const Home = () => {
  const [tollywoodMoviesData, setTollywoodMoviesData] = useState([]);
  const [bollywoodMoviesData, setBollywoodMoviesData] = useState([]);
  const [hollywoodMoviesData, setHollywoodMoviesData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useDocumentTitle("iBommaFlix - Discover Telugu, Hindi & English Movies");

  // Fetch latest trending movies from TMDB
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const [te, hi, en] = await Promise.all([
        fetchTrendingMovies("tollywood"),
        fetchTrendingMovies("bollywood"),
        fetchTrendingMovies("hollywood"),
      ]);
      setTollywoodMoviesData(te.slice(0, 6));
      setBollywoodMoviesData(hi.slice(0, 6));
      setHollywoodMoviesData(en.slice(0, 6));
      setLoading(false);
    };
    loadMovies();
  }, []);

  // Search navigates to movie details page
  const fetchMovie = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    navigate(`/movie/${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  const categories = [
    { title: "Trending in Tollywood", data: tollywoodMoviesData },
    { title: "Trending in Bollywood", data: bollywoodMoviesData },
    { title: "Trending in Hollywood", data: hollywoodMoviesData },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "iBommaFlix",
    "url": "https://ibommaflix.com",
    "description": "Movie discovery and rating aggregation platform for Telugu, Hindi, and English movies",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ibommaflix.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      <StructuredData data={websiteSchema} />
      <h1 className="sr-only">iBommaFlix - Discover Movies</h1>
      <CustomNavbar />
      <MovieCarousel />

      {/* Ad — below hero carousel */}
      <AdBanner adSlot="1234567890" />

      {/* Search Bar */}
      <Container className="mt-3 text-center">
        <SearchBar onSearch={fetchMovie} searchInput={searchInput} setSearchInput={setSearchInput} />
      </Container>

      {/* Tagline */}
      <Container className="tagline-container">
        <h2 className="tagline-heading">Where Quality & Clarity Matters</h2>
        <p className="tagline-text">
          Watch Tollywood, Bollywood, Hollywood movies in HD, exclusively available on iBommaFlix.
        </p>
      </Container>

      {/* Movie Sections — Netflix-style horizontal scroll */}
      <div className="movie-sections">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-movies-text">Loading movies...</p>
          </div>
        ) : (
          categories.map((category, i) => (
            <React.Fragment key={i}>
              <div className="movie-category">
                <h2 className="category-title">{category.title}</h2>
                <div className="scroll-row">
                  {category.data.map((m, index) => (
                    <div
                      key={m.id || index}
                      className="poster-card"
                      onClick={() => navigate(`/movie/${encodeURIComponent(m.title)}`)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${m.title}`}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/movie/${encodeURIComponent(m.title)}`); }}
                    >
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="poster-img"
                        onError={handleImgError}
                        loading="lazy"
                      />
                      <div className="play-button">&#9654;</div>
                      <p className="poster-title">{m.title}</p>
                      <p className="poster-year">{m.year}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Ad — between Bollywood and Hollywood sections */}
              {i === 1 && <AdBanner adSlot="0987654321" />}
            </React.Fragment>
          ))
        )}
      </div>

    </div>
  );
};

export default Home;
