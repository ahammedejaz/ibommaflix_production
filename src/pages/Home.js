import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Modal, Box, Typography, Button } from "@mui/material"; // Material-UI Modal
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar"; // Import SearchBar
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";
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
      const cacheKey = `movies_${movies[0]}`; // Unique cache key based on the first movie
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        // If cached data exists, use it
        return JSON.parse(cachedData);
      }

      let validMovies = [];
      let retries = 0; // Retry counter

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
            imdbRating: res.data.imdbRating, // Capture imdbRating
          }));

        retries++;
      }

      // If still less than 5, fill the rest with a generic movie poster
      while (validMovies.length < 5) {
        validMovies.push({
          title: "Coming Soon",
          year: "N/A",
          poster: "https://via.placeholder.com/160x250?text=Coming+Soon",
        });
      }

      // Cache the fetched data for future use
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

  // Calculate the Verdict based on IMDb Rating
  const getVerdict = (rating) => {
    if (!rating || rating === "N/A") return "Rating unavailable";

    const imdbRating = parseFloat(rating);
    if (imdbRating < 5) {
      return "Not worth watching";
    } else if (imdbRating >= 5 && imdbRating <= 6.5) {
      return "Average";
    } else if (imdbRating > 6.5 && imdbRating <= 8) {
      return "Good to watch";
    } else {
      return "Worth watching";
    }
  };

  // Fetch Movie Data for Search
  const fetchMovie = async (searchTerm) => {
    if (!searchTerm) return;
    try {
      const cacheKey = `movie_${searchTerm}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        // If cached data exists, use it
        const movieData = JSON.parse(cachedData);
        setMovie(movieData);
        setVerdict(getVerdict(movieData.imdbRating)); // Calculate verdict
        setIsModalOpen(true);
      } else {
        const res = await axios.get(`https://www.omdbapi.com/?t=${searchTerm}&apikey=${OMDB_API_KEY}`);
        if (res.data.Response === "True") {
          const movieData = res.data;
          setMovie(movieData);
          setVerdict(getVerdict(movieData.imdbRating)); // Calculate verdict
          localStorage.setItem(cacheKey, JSON.stringify(movieData)); // Cache the data
          setIsModalOpen(true);
        } else {
          alert("Movie not found!");
        }
      }
    } catch {
      alert("Error fetching movie data!");
    }
  };

  // Close Modal and Reset Inputs
  const closeModal = () => {
    setIsModalOpen(false);
    setMovie(null);
    setVerdict("Fetching Verdict...");
    setSearchInput(""); // Clears search input when modal is closed
  };

  return (
    <div>
      <CustomNavbar />
      <MovieCarousel />

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

      {/* Movie Sections (Ensures Exactly 5 Posters per Industry) */}
      <Container className="movie-sections">
        {[{ title: "Tollywood Movies", data: tollywoodMoviesData },
          { title: "Bollywood Movies", data: bollywoodMoviesData },
          { title: "Hollywood Movies", data: hollywoodMoviesData }].map((category, i) => (
          <div key={i} className="movie-category">
            <h2 className="text-gold text-center">{category.title}</h2>
            <div className="poster-group">
              {category.data.map((movie, index) => (
                <div key={index} className="poster-card">
                  <img src={movie.poster} alt={movie.title} className="poster-img" />
                  <div className="play-button">▶</div>
                  <p className="poster-title">{movie.title}</p>
                  <p className="poster-year">{movie.year}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>

      {/* Material-UI Movie Popup Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal} // Updated to use closeModal
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
            width: 450,
            textAlign: "center",
          }}
        >
          <Typography id="movie-modal-title" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {movie?.Title} ({movie?.Year})
          </Typography>
          <img src={movie?.Poster} alt={movie?.Title} className="movie-modal-img" />
          <Typography variant="body1" sx={{ mt: 2 }}><strong>Genre:</strong> {movie?.Genre}</Typography>
          <Typography variant="body1"><strong>IMDb Rating:</strong> {movie?.imdbRating}</Typography>
          <Typography variant="body1"><strong>Plot:</strong> {movie?.Plot}</Typography>
          <Typography variant="h6" sx={{ color: "gold", mt: 2 }}>{verdict}</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={closeModal} // Updated to use closeModal
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