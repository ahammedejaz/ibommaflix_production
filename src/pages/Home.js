import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Modal, Box, Typography, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import "./Home.css";

const Home = () => {
  const [tollywoodMoviesData, setTollywoodMoviesData] = useState([]);
  const [bollywoodMoviesData, setBollywoodMoviesData] = useState([]);
  const [hollywoodMoviesData, setHollywoodMoviesData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [movie, setMovie] = useState(null);
  const [verdict, setVerdict] = useState("Fetching Verdict...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  // Fetch Exactly 5 Valid Movie Posters with Caching
  const fetchMoviesData = useCallback(async (movies) => {
    try {
      const cacheKey = `movies_${movies[0]}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData);
      }

      let validMovies = [];
      let retries = 0;

      while (validMovies.length < 5 && retries < 10) {
        let uniqueMovies = new Set();
        while (uniqueMovies.size < 5) {
          uniqueMovies.add(movies[Math.floor(Math.random() * movies.length)]);
        }

        const selectedMovies = Array.from(uniqueMovies);
        const movieRequests = selectedMovies.map((title) =>
          axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`)
        );
        const responses = await Promise.all(movieRequests);

        validMovies = responses
          .filter((res) => res.data.Response === "True" && res.data.Poster !== "N/A")
          .map((res) => ({
            title: res.data.Title,
            year: res.data.Year,
            poster: res.data.Poster,
            imdbRating: res.data.imdbRating,
          }));

        retries++;
      }

      // Fill remaining slots with placeholder
      while (validMovies.length < 5) {
        validMovies.push({
          title: "Coming Soon",
          year: "N/A",
          poster: posterPlaceholder,
        });
      }

      localStorage.setItem(cacheKey, JSON.stringify(validMovies));
      return validMovies;
    } catch {
      return [];
    }
  }, [OMDB_API_KEY]);

  useEffect(() => {
    const loadMovies = async () => {
      setTollywoodMoviesData(await fetchMoviesData(tollywoodMovies));
      setBollywoodMoviesData(await fetchMoviesData(bollywoodMovies));
      setHollywoodMoviesData(await fetchMoviesData(hollywoodMovies));
    };
    loadMovies();
  }, [fetchMoviesData]);

  const getVerdict = (rating) => {
    if (!rating || rating === "N/A") return "Rating unavailable";
    const imdbRating = parseFloat(rating);
    if (imdbRating < 5) return "Not worth watching";
    if (imdbRating <= 6.5) return "Average";
    if (imdbRating <= 8) return "Good to watch";
    return "Worth watching";
  };

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
        const res = await axios.get(`https://www.omdbapi.com/?t=${searchTerm}&apikey=${OMDB_API_KEY}`);
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

  return (
    <div>
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
        {categories.map((category, i) => (
          <React.Fragment key={i}>
            <div className="movie-category">
              <h2 className="category-title">{category.title}</h2>
              <div className="scroll-row">
                {category.data.map((m, index) => (
                  <div key={index} className="poster-card" onClick={() => fetchMovie(m.title)}>
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
        ))}
      </div>

      {/* Material-UI Movie Popup Modal */}
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
