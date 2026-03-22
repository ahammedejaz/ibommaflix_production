import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Modal, Box, Typography, Button } from "@mui/material";
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
  const [movie, setMovie] = useState(null);
  const [verdict, setVerdict] = useState("Fetching Verdict...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
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
      setTollywoodMoviesData(te.slice(0, 10));
      setBollywoodMoviesData(hi.slice(0, 10));
      setHollywoodMoviesData(en.slice(0, 10));
      setLoading(false);
    };
    loadMovies();
  }, []);

  const getVerdict = (rating) => {
    if (!rating || rating === "N/A") return "Rating unavailable";
    const r = parseFloat(rating);
    if (r < 5) return "Not worth watching";
    if (r <= 6.5) return "Average";
    if (r <= 8) return "Good to watch";
    return "Worth watching";
  };

  // Search still uses OMDb for exact title lookup + IMDb rating
  const fetchMovie = async (searchTerm) => {
    if (!searchTerm) return;
    try {
      const cacheKey = `movie_${searchTerm}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const movieData = JSON.parse(cachedData);
        setMovie(movieData);
        setVerdict(getVerdict(movieData.imdbRating));
        setIsModalOpen(true);
      } else {
        const res = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(searchTerm)}&apikey=${OMDB_API_KEY}`);
        if (res.data.Response === "True") {
          const movieData = res.data;
          setMovie(movieData);
          setVerdict(getVerdict(movieData.imdbRating));
          localStorage.setItem(cacheKey, JSON.stringify(movieData));
          setIsModalOpen(true);
        } else {
          alert("Movie not found!");
        }
      }
    } catch {
      alert("Error fetching movie data!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
    setVerdict("Fetching Verdict...");
    setSearchInput("");
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

      {/* Material-UI Movie Popup Modal — for search results */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="movie-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="modal-box"
          sx={{
            bgcolor: "black",
            color: "white",
            p: 3,
            borderRadius: 2,
            width: { xs: "90vw", sm: 450 },
            maxWidth: "95vw",
            textAlign: "center",
          }}
        >
          <Typography id="movie-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {movie?.Title} ({movie?.Year})
          </Typography>
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            className="movie-modal-img"
            onError={handleImgError}
          />
          <Typography variant="body1" sx={{ mt: 2 }}><strong>Genre:</strong> {movie?.Genre}</Typography>
          <Typography variant="body1"><strong>IMDb Rating:</strong> {movie?.imdbRating}</Typography>
          <Typography variant="body1"><strong>Plot:</strong> {movie?.Plot}</Typography>
          <Typography variant="h6" sx={{ color: "gold", mt: 2 }}>{verdict}</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={closeModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
